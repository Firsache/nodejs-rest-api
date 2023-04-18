const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const { User } = require("./models");

const { DB_HOST, PORT = 3000 } = process.env;

describe("POST /api/users/register", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  describe("given an email and a password", () => {
    test("should respond with status code 201", async () => {
      const newUser = await User.create({
        email: "test1@mail.com",
        password: "testtest1",
      });
      const response = await request(app)
        .post("/api/users/register")
        .send(newUser);
      console.log(response);
      expect(response.status).toBe(201);
    });
  });
});

describe("POST /api/users/login", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });
  describe("given an email and a password", () => {
    test("should respond with status code 200", async () => {
      const response = await request(app).post("/login").send({
        email: "lou71@mail.com",
        password: "bouboubou",
      });
      expect(response.status).toBe(200);
    });
    test("should respond with json", async () => {
      const response = await request(app).post("/login").send({
        email: "lou71@mail.com",
        password: "bouboubou",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("should respond with token", async () => {
      const response = await request(app).post("/login").send({
        email: "lou71@mail.com",
        password: "bouboubou",
      });
      expect(response.data.token).toBeDefined();
    });
    test("should respond with an object user containing email and subscription", async () => {
      const response = await request(app).post("/login").send({
        email: "lou71@mail.com",
        password: "bouboubou",
      });
      expect(response.data.user.email).toBeDefined();
      expect(response.data.user.subscription).toBeDefined();
    });
    describe("when an email and a password is wrong", () => {
      test("should respond with status code 404", async () => {
        const response = await request(app).post("/login").send({
          email: "useremail@mail.com",
          password: "passpasspass",
        });
        expect(response.status).toBe(404);
      });
    });
    describe("when an email and a password is missing", () => {
      test("should respond with status code 404", async () => {
        const response = await request(app).post("/login").send({});
        expect(response.status).toBe(404);
      });
    });
  });
});
