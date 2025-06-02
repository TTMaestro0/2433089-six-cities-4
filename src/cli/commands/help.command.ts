import chalk from 'chalk';
import { ICommand } from './command.interface.js';

export class HelpCommand implements ICommand {
  public getName(): string {
    return '--help';
  }

  public async execute(..._args: string[]): Promise<void> {
    console.info(
      chalk.white(`
Программа для подготовки данных для REST API сервера.`)
    );
    console.info(chalk.black('Пример:'));
    console.info(chalk.white('\tcli.js --<command> [--arguments]'));
    console.info(chalk.black('Команды:'));
    console.info(
      chalk.white(`\t--version                   # выводит номер версии
\t--help                      # печатает этот текст
\t--import <path>             # импортирует данные из TSV
\t--generate <n> <path> <url> # генериурет произвольное количетсво тестовых данных

<db_uri> is string in format: mongodb://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]?authSource=admin
    `)
    );
  }
}
