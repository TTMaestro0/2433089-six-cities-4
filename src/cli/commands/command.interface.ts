export interface ICommand {
  getName(): string;
  execute(...patametrs: string[]): void;
}
