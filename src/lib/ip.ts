type HeaderLike = {
  get(name: string): string | null;
};

export function parseAllowedIps(value: string | undefined) {
  return (value ?? '')
    .split(',')
    .map((ip) => ip.trim())
    .filter(Boolean);
}

export function getClientIp(headers: HeaderLike) {
  const forwardedFor = headers.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? '';
  }

  return headers.get('x-real-ip')?.trim() ?? headers.get('cf-connecting-ip')?.trim() ?? '';
}

export function isAllowedLoginIp(clientIp: string, allowedIps: string[]) {
  if (allowedIps.length === 0) {
    return true;
  }

  return allowedIps.includes(clientIp);
}