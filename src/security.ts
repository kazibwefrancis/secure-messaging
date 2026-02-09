// Placeholder for security service
export class SecurityService {
  static encrypt(data: string): string {
    // In real app, use AES or similar
    return `encrypted:${data}`;
  }

  static decrypt(data: string): string {
    // In real app, decrypt
    if (data.startsWith('encrypted:')) {
      return data.substring(10);
    }
    return data;
  }
}