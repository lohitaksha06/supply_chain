use actix_web::{get, web, HttpResponse, Responder};

#[get("/dashboard/customer")]
async fn customer_dashboard() -> impl Responder {
    HttpResponse::Ok().body("Welcome to the Customer Dashboard!")
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(customer_dashboard);
}
