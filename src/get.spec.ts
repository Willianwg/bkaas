import request from "supertest";
import app from "./app";

describe("Routes", ()=>{
    it("should get response", async ()=>{
        const response = await request(app).get("/")
        .expect("nice");

        console.log(response.text);
    })
})