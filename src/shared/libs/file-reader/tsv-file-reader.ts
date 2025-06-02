import { EventEmitter } from 'node:events';
import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';

const CHUNK_SIZE = 16384;

export class TsvFileReader extends EventEmitter implements FileReader {
  constructor(
    private readonly filename: string
  ) {
    super();
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8'
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;
        this.emit('readline', completeRow);
      }
    }

    this.emit('end', importedRowCount);
  }
}
