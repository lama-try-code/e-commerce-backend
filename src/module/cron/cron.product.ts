import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { ProductService } from "../product/product.service";
import * as path from "path";
import * as fs from 'fs';

@Processor('products')
export class ProductsConsumer extends WorkerHost {
  constructor(private readonly productService: ProductService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    console.log(`[Processor] Received Job: `, job.name, job.data);

    switch (job.name) {
      case 'export-inventory':
        return await this.handleExportInventory(job);
      default:
        return { success: false, message: '[Processor] Unknown job' };
    }
  }

  private async handleExportInventory(job: Job): Promise<any> {
    const timestamp = this.formatTimestamp(job.data.timestamp);
    const reportDir = this.ensureDirectory(path.join(process.cwd(), 'reports'));

    const products = await this.productService.findAvailable();
    const simplifiedProducts = products.map(p => this.simplifyProduct(p));

    const reportFileName = `inventory-simplified-${timestamp}.json`;
    const reportPath = path.join(reportDir, reportFileName);

    fs.writeFileSync(reportPath, JSON.stringify(simplifiedProducts, null, 2));
    console.log(`[Processor] Exported inventory to: ${reportPath}`);

    return { success: true, message: '[Processor] Export inventory successfully' };
  }

  private formatTimestamp(date: string): string {
    return date.replace(/[\/\\:]/g, '-').replace(/\s+/g, '_');
  }

  private ensureDirectory(dirPath: string): string {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`[Processor] Created directory: ${dirPath}`);
    }
    return dirPath;
  }

  private simplifyProduct(product: any) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    };
  }
}
