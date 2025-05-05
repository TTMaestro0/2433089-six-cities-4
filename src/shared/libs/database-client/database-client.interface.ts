export interface DatabaseClient {
  connect(url: string): Promise<void>;
  disconnect(): Promise<void>;
}
