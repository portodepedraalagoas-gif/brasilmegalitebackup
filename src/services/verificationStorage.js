import path from 'node:path';
export const verificationDirectory = process.env.MTA_VERIFY_DIR || (
  process.env.RAILWAY_VOLUME_MOUNT_PATH
    ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, 'verification')
    : '/data/verification'
);
export function reportVerificationStorage(count) {
  const mount = process.env.RAILWAY_VOLUME_MOUNT_PATH;
  const relative = mount ? path.relative(path.resolve(mount), path.resolve(verificationDirectory)) : null;
  if (process.env.RAILWAY_ENVIRONMENT_ID && (!mount || relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative))) {
    console.warn('[BML Verificação] ATENÇÃO: vínculos fora de um volume persistente. Anexe um volume em /data e use MTA_VERIFY_DIR=/data/verification.');
  }
  console.log(`[BML Verificação] ${count} vínculo(s) recuperado(s). Pasta: ${verificationDirectory}`);
}
