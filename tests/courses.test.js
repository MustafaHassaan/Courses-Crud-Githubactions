// tests/courses.test.js
const request = require("supertest");
const app = require("../index"); // app فقط بدون listen

describe("Courses API CRUD Tests", () => {
  const courseId = "test-123"; // id ثابت لكل الاختبارات
  const newCourse = {
    id: courseId,
    course_name: "Testing Course",
    duration_hours: 10,
    price: 100,
  };

  // Add the course once before PATCH and DELETE
  beforeAll(async () => {
    await request(app).post("/api/courses").send(newCourse);
  });

  // Test 1: GET all courses
  it("GET /api/courses → should return all courses", async () => {
    const res = await request(app).get("/api/courses");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test 2: GET single course
  it("GET /api/courses/:id → should return single course", async () => {
    const res = await request(app).get(`/api/courses/${courseId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", courseId);
  });

  // Test 3: POST add course again (id موجود بالفعل، للتأكد من 201 response)
  it("POST /api/courses → should add a new course", async () => {
    const res = await request(app).post("/api/courses").send({
      id: "test-456",
      course_name: "Another Course",
      duration_hours: 5,
      price: 50,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "test-456",
          course_name: "Another Course",
        }),
      ])
    );
  });

  // Test 4: PATCH update course
  it("PATCH /api/courses/:id → should update course", async () => {
    const res = await request(app)
      .patch(`/api/courses/${courseId}`) // استخدم نفس id من beforeAll
      .send({ price: 500 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(500);
  });

  // Test 5: DELETE course
  it("DELETE /api/courses/:id → should delete course", async () => {
    const res = await request(app).delete(`/api/courses/${courseId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.some((c) => c.id === courseId)).toBe(false);
  });
});
