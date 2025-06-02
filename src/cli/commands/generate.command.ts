import got from 'got';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { TsvFileWriter } from '../../shared/libs/file-writer/index.js';
import { TsvOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { MockServerData } from '../../shared/types/index.js';
import { ICommand } from './command.interface.js';

export class GenerateCommand implements ICommand {
  private initialData: MockServerData;

  public getName(): string {
    return '--generate';
  }

  public async execute(...args: string[]): Promise<void> {
    const [count, path, url] = args;
    const offerCount = Number.parseInt(count, 10);
    try {
      await this.load(url);
      await this.write(path, offerCount);
      console.info(`File ${path} was created.`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(`Details: ${getErrorMessage(error)}`);
    }
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw new Error(`Can't load data from ${url}`);
      }

      throw new Error(`Can't load data from ${url}: ${error.message}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const generator = new TsvOfferGenerator(this.initialData);
    const writer = new TsvFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      const row = generator.generate();
      await writer.write(row);
    }
  }

}
