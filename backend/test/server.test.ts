import request from "supertest";
import Prisma from "../src/db";
import { server } from "../src/server";

describe("Card API Routes", () => {
  // Start server before running tests
  beforeAll(async () => {
    await server.ready();
  });

  // Close server after tests are done
  afterAll(async () => {
    await server.close();
  });

  // Clear the database between tests to ensure no data conflict
  beforeEach(async () => {
    await Prisma.entry.deleteMany();
  });

  // Test creating a new card
  it("should create a new card", async () => {
    const response = await request(server.server).post("/create/").send({
      title: "Test Card",
      description: "Test description for the card",
      created_at: new Date(),
      scheduled_date: new Date(),
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test Card");
    expect(response.body.description).toBe("Test description for the card");
  });

  // Test fetching all cards (should include the one created earlier)
  it("should fetch all cards", async () => {
    await Prisma.entry.create({
      data: {
        title: "Test Card",
        description: "Test description",
        created_at: new Date(),
        scheduled_date: new Date(),
      },
    });

    // Fetch all cards
    const response = await request(server.server).get("/get/");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1); // Should have 1 entry
  });

  // Test updating a card
  it("should update a card", async () => {
    // Create a test card
    const card = await Prisma.entry.create({
      data: {
        title: "Old Title",
        description: "Old description",
        created_at: new Date(),
        scheduled_date: new Date(),
      },
    });

    // Update the card
    const response = await request(server.server).put(`/update/${card.id}`).send({
      title: "Updated Title",
      description: "Updated description",
      created_at: card.created_at,
      scheduled_date: card.scheduled_date,
    });

    expect(response.statusCode).toBe(200);
    const updatedCard = await Prisma.entry.findUnique({ where: { id: card.id } });
    expect(updatedCard?.title).toBe("Updated Title");
    expect(updatedCard?.description).toBe("Updated description");
  });

  // Test deleting a card
  it("should delete a card", async () => {
    // Create a test card
    const card = await Prisma.entry.create({
      data: {
        title: "Test Card",
        description: "Test description",
        created_at: new Date(),
        scheduled_date: new Date(),
      },
    });

    // Delete the card
    const response = await request(server.server).delete(`/delete/${card.id}`);
    expect(response.statusCode).toBe(200);

    // Ensure it's deleted
    const deletedCard = await Prisma.entry.findUnique({ where: { id: card.id } });
    expect(deletedCard).toBeNull();
  });
});
