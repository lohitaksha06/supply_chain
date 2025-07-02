use std::collections::HashMap;
use chrono::prelude::*;
use std::io;

#[derive(Debug)]
struct Checkpoint {
    location: String,
    timestamp: String,
}

#[derive(Debug)]
struct MedicineBatch {
    batch_id: String,
    name: String,
    origin: String,
    checkpoints: Vec<Checkpoint>,
}

impl MedicineBatch {
    fn new(batch_id: &str, name: &str, origin: &str) -> Self {
        let first_checkpoint = Checkpoint {
            location: origin.to_string(),
            timestamp: Utc::now().to_rfc3339(),
        };

        Self {
            batch_id: batch_id.to_string(),
            name: name.to_string(),
            origin: origin.to_string(),
            checkpoints: vec![first_checkpoint],
        }
    }

    fn update_checkpoint(&mut self, location: &str) {
        let new_checkpoint = Checkpoint {
            location: location.to_string(),
            timestamp: Utc::now().to_rfc3339(),
        };
        self.checkpoints.push(new_checkpoint);
    }

    fn display_history(&self) {
        println!("--- Tracking History for Batch {} ---", self.batch_id);
        for (i, cp) in self.checkpoints.iter().enumerate() {
            println!("Checkpoint {}: {} at {}", i + 1, cp.location, cp.timestamp);
        }
        let start = &self.checkpoints.first().unwrap().timestamp;
        let end = &self.checkpoints.last().unwrap().timestamp;
        println!("\nDelivery started at: {}\nDelivery ended at: {}", start, end);
    }
}

#[derive(Debug)]
struct PharmaCompany {
    company_id: String,
    name: String,
    address: String,
    stock_needed: Vec<String>,
    batches: HashMap<String, MedicineBatch>,
}

fn main() {
    let mut companies: HashMap<String, PharmaCompany> = HashMap::new();
    let mut input = String::new();

    println!("Welcome to the Pharma Supply Chain Tracker!");
    println!("Enter your company name:");
    io::stdin().read_line(&mut input).unwrap();
    let name = input.trim().to_string();
    input.clear();

    println!("Enter your company address:");
    io::stdin().read_line(&mut input).unwrap();
    let address = input.trim().to_string();
    input.clear();

    println!("Enter the medicine you need (e.g., Paracetamol 500mg):");
    io::stdin().read_line(&mut input).unwrap();
    let medicine = input.trim().to_string();
    input.clear();

    let company_id = format!("COMP{}", companies.len() + 1);

    let mut batch_map: HashMap<String, MedicineBatch> = HashMap::new();
    let batch_id = format!("BATCH{}", batch_map.len() + 1);
    let mut batch = MedicineBatch::new(&batch_id, &medicine, "Global Supplier - India");

    batch.update_checkpoint("Pfizer Plant - USA");
    batch.update_checkpoint("Warehouse - Texas");
    batch.update_checkpoint("Distributor - California");
    batch.update_checkpoint(&address);

    batch_map.insert(batch_id.clone(), batch);

    let company = PharmaCompany {
        company_id: company_id.clone(),
        name: name.clone(),
        address: address.clone(),
        stock_needed: vec![medicine.clone()],
        batches: batch_map,
    };

    companies.insert(company_id.clone(), company);

    println!("\nOrder placed by: {}", name);
    println!("Delivering: {}", medicine);

    if let Some(company) = companies.get(&company_id) {
        for batch in company.batches.values() {
            batch.display_history();
        }
    }
}
