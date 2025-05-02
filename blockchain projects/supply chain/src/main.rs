use std::collections::HashMap;

#[derive(Debug)]
struct MedicineBatch {
    batch_id: String,
    name: String,
    origin: String,
    checkpoints: Vec<String>,
}

impl MedicineBatch {
    fn new(batch_id: &str, name: &str, origin: &str) -> Self {
        Self {
            batch_id: batch_id.to_string(),
            name: name.to_string(),
            origin: origin.to_string(),
            checkpoints: vec![origin.to_string()],
        }
    }

    fn update_checkpoint(&mut self, location: &str) {
        self.checkpoints.push(location.to_string());
    }

    fn display_history(&self) {
        println!("--- Tracking History for Batch {} ---", self.batch_id);
        for (i, checkpoint) in self.checkpoints.iter().enumerate() {
            println!("Checkpoint {}: {}", i + 1, checkpoint);
        }
    }
}

fn main() {
    let mut supply_chain: HashMap<String, MedicineBatch> = HashMap::new();

    // Add a new batch
    let mut batch = MedicineBatch::new("BATCH123", "Paracetamol 500mg", "Pfizer Plant - USA");
    supply_chain.insert(batch.batch_id.clone(), batch);

    // Simulate transport
    if let Some(b) = supply_chain.get_mut("BATCH123") {
        b.update_checkpoint("Warehouse - Texas");
        b.update_checkpoint("Distributor - California");
        b.update_checkpoint("Pharmacy - Los Angeles");
        b.display_history();
    }
}

