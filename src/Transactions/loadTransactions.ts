import Papa from 'papaparse';
import { Transaction } from './Transaction';

async function fetchText(path: string): Promise<string> {
  const resp = await fetch(path);
  if (!resp.ok) throw new Error(`Failed to fetch ${path}: ${resp.status}`);
  return resp.text();
}

function toTransaction(row: Record<string, any>): Transaction {
  const refRaw = row['Reference Number'] || row['ReferenceNumber'] || '';
  const id = String(refRaw).replace(/^"+|"+$/g, '') || `${row['Date']}-${row['Merchant Name']}-${Math.random()}`;

  const rawAmount = row['Amount'] || row[' amount'] || '';
  const amount = Number(String(rawAmount).replace(/[^0-9.-]+/g, '')) || 0;

  const dateStr = row['Date'] || row['Posted Date'] || '';
  const date = dateStr ? new Date(dateStr) : new Date();

  const category = row['Merchant Category'] || row['Activity Type'] || '';

  const rewardsRaw = row['Rewards'] || row['Reward Points'] || row['Rewards Earned'] || '';
  const rewardsEarned = Number(String(rewardsRaw).replace(/[^0-9-]+/g, '')) || 0;

  const merchant = row['Merchant Name'] || row['Merchant'] || '';
  const merchantCity = row['Merchant City'] || row['MerchantCity'] || '';
  const merchantState = row['Merchant State/Province'] || row['Merchant State'] || row['MerchantState'] || '';

  return {
    id,
    amount,
    date,
    category,
    rewardsEarned,
    merchant,
    merchantCity,
    merchantState,
  };
}

export async function loadAllTransactions(): Promise<Transaction[]> {
  try {
    const manifestText = await fetchText('/csvs/manifest.json');
    const files: string[] = JSON.parse(manifestText);
    const results: Transaction[] = [];

    for (const f of files) {
      try {
        const text = await fetchText(`/csvs/${f}`);
        const parsed = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true });
        const rows = parsed.data || [];
        for (const r of rows) {
          try {
            results.push(toTransaction(r));
          } catch (e) {
            console.error('Row parse error', e, r);
          }
        }
      } catch (e) {
        console.error('Failed to load', f, e);
      }
    }

    // sort by date descending
    results.sort((a, b) => +b.date - +a.date);
    return results;
  } catch (e) {
    console.warn('No manifest or CSVs found', e);
    return [];
  }
}
