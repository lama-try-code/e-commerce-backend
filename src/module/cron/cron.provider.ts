import { QueueEvents } from "bullmq"

export const productsQueueEventProvider = {
    provide: 'PRODUCT_QUEUE_EVENTS',
    useFactory: async () => {
        const queueEvents = new QueueEvents('products');
        await queueEvents.waitUntilReady();
        return queueEvents;
    }
}