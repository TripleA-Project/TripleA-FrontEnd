export const mockSession = new Map<string, string>();

export const mockSessionManage = {
  session: mockSession,
  get(key: string) {
    return this.session.get(key);
  },
  getAll() {
    return Array.from(this.session.entries()).map(([key, value]) => ({ [`${key}`]: value }));
  },
  set(key: string, value: string) {
    return this.session.set(key, value);
  },
  delete(key: string) {
    return this.session.delete(key);
  },
};
