import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { DataSource } from 'typeorm';
import { mongoDatasource } from './mongo.db';
import { mongodbConfig } from './mongo.db-config';

describe('MongoDB Connection', () => {
  beforeAll(async () => {
    // Ensure the datasource is not initialized before tests
    if (mongoDatasource.isInitialized) {
      await mongoDatasource.destroy();
    }
  });

  afterAll(async () => {
    // Clean up after tests
    if (mongoDatasource.isInitialized) {
      await mongoDatasource.destroy();
    }
  });

  it('should connect to MongoDB successfully', async () => {
    // Initialize the connection
    await expect(mongoDatasource.initialize()).resolves.not.toThrow();

    // Check if connection is established
    expect(mongoDatasource.isInitialized).toBe(true);
  });

  it('should have the correct database name', () => {
    expect(mongodbConfig.database).toBe('jobscrapperdb');
  });

  it('should have MongoDB as the database type', () => {
    expect(mongodbConfig.type).toBe('mongodb');
  });
});
