import * as fs from 'fs';
import * as path from 'path';

export const MIN_REQUIRED_USD = 2.0;
export const MIN_REQUIRED_HBAR_USD = 30.0;

export const ENV_FILE_PATH = path.join(process.cwd(), '.env');

export async function updateEnvFile(
  envFilePath: string,
  variables: Record<string, string>
): Promise<void> {
  let envContent = '';

  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, 'utf8');
  }

  const envLines = envContent.split('\n');
  const updatedLines = [...envLines];

  for (const [key, value] of Object.entries(variables)) {
    const lineIndex = updatedLines.findIndex((line) =>
      line.startsWith(`${key}=`)
    );

    if (lineIndex !== -1) {
      updatedLines[lineIndex] = `${key}=${value}`;
    } else {
      updatedLines.push(`${key}=${value}`);
    }
  }

  if (updatedLines[updatedLines.length - 1] !== '') {
    updatedLines.push('');
  }

  fs.writeFileSync(envFilePath, updatedLines.join('\n'));
}
