import { MAX_HANDLE_LENGTH } from "./constants";

export function isWebEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function isValidWebLink(str: string) {
  try {
    const url = new URL(str);

    if (!['https:', 'http:'].includes(url.protocol)) {
      throw new Error('Invalid protocol');
    }

    return true;
  } catch {
    return false;
  }
}

export function checkPassword(password: string) {
  if (typeof password !== 'string') {
    return checkPassword("");
  }

  const details = {
    minLengthOk:    password.length >= 8,
    hasUpperCase:   password !== password.toLowerCase(),
    hasLowerCase:   password !== password.toUpperCase(),
    hasNumber:      /\d/.test(password),
    hasSpecialChar: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password),
  }

  return {
    details,
    strong: Object.values(details).every(Boolean)
  }
}

export function dimStart(str: string) {
  if (!str || typeof str !== 'string') {
    return "";
  }

  const n = Math.floor(str.length / 2);
  const visible = str.slice(0, n);
  const hidden = '*'.repeat(str.slice(n).length);
  return `${visible}${hidden}`;
}

export function dimEnd(str: string) {
  if (!str || typeof str !== 'string') {
    return "";
  }

  const n = Math.floor(str.length / 2);
  const hidden = '*'.repeat(str.slice(0, n).length);
  const visible = str.slice(n);
  return `${hidden}${visible}`;
}

export function dimEmail(str: string) {
  const [ user, domain ] = str.split('@');
  return dimEnd(user) + '@' + dimStart(domain);
}

export function normalizeHandle(handle: string) {
  if (!handle || typeof handle !== 'string') {
    return '';
  }

  if (handle.startsWith('@')) {
    return normalizeHandle(handle.substring(1));
  }
  
  const normalized = handle
    .replace(/[^a-z0-9-_]/gi, '')
    .trim()
    .substring(0, MAX_HANDLE_LENGTH);

  return normalized;
}

export function isValidHandle(handle: string) {
  if (!handle || typeof handle !== 'string') {
    return false;
  }

  if (handle.startsWith('@')) {
    return isValidHandle(handle.substring(1));
  }

  return normalizeHandle(handle) === handle;
}

