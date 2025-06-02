use actix_web::{get, web, HttpResponse, Responder};

#[get("/dashboard/hospital")]
async fn hospital_dashboard() -> impl Responder {
    HttpResponse::Ok().body("Welcome to the Hospital Dashboard!")
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(hospital_dashboard);
}
