"""
EchoEats — Product Data Seeder (Python)
========================================
This script connects to MongoDB and seeds the products collection
with the initial food catalog for the EchoEats platform.

Usage:
    pip install pymongo python-dotenv
    python seed_products.py

Author: EchoEats Dev Team
"""

import os
import sys
import io
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

# Fix Windows console encoding for special characters
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Load environment variables from .env
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

MONGO_URI = os.getenv('MONGO_URI', 'mongodb://127.0.0.1:27017/ecommerce')

# ── Product Catalog ──────────────────────────────────────────────
products = [
    {
        "name": "Margherita Pizza",
        "image": "/01_Margherita.jpeg",
        "description": "Classic delight with 100% real mozzarella cheese.",
        "category": "Pizza",
        "price": 10.99,
        "countInStock": 20,
    },
    {
        "name": "Farmhouse Pizza",
        "image": "/02_Farmhouse.jpeg",
        "description": "Delightful combination of onion, capsicum, tomato & grilled mushroom.",
        "category": "Pizza",
        "price": 12.99,
        "countInStock": 20,
    },
    {
        "name": "Pepperoni Pizza",
        "image": "/03_Pepperoni.jpeg",
        "description": "A classic American taste with spicy pepperoni.",
        "category": "Pizza",
        "price": 14.99,
        "countInStock": 15,
    },
    {
        "name": "Veggie Burger",
        "image": "/04_VeggieBurger.jpeg",
        "description": "Healthy and tasty vegetarian burger with fresh lettuce and tomato.",
        "category": "Burger",
        "price": 8.99,
        "countInStock": 25,
    },
    {
        "name": "Chicken Burger",
        "image": "/05_ChickenBurger.jpeg",
        "description": "Juicy grilled chicken patty with fresh lettuce, tomatoes, and mayo.",
        "category": "Burger",
        "price": 9.99,
        "countInStock": 20,
    },
    {
        "name": "Cheese Burger",
        "image": "/06_CheeseBurger.jpeg",
        "description": "Classic beef burger loaded with cheese.",
        "category": "Burger",
        "price": 10.99,
        "countInStock": 18,
    },
    {
        "name": "Chicken Biryani",
        "image": "/07_ChickenBiryani.jpeg",
        "description": "Aromatic basmati rice layered with spiced chicken.",
        "category": "Indian",
        "price": 15.99,
        "countInStock": 10,
    },
    {
        "name": "Thali",
        "image": "/08_Thali.jpeg",
        "description": "A complete Indian meal featuring a variety of dishes.",
        "category": "Indian",
        "price": 12.99,
        "countInStock": 15,
    },
    {
        "name": "Masala Dosa",
        "image": "/09_MasalaDosa.jpeg",
        "description": "Crispy rice crepe filled with spiced potato curry.",
        "category": "Indian",
        "price": 7.99,
        "countInStock": 30,
    },
    {
        "name": "Obbattu",
        "image": "/10_Obbattu.jpeg",
        "description": "Traditional Indian sweet flatbread stuffed with jaggery and lentils.",
        "category": "Dessert",
        "price": 5.99,
        "countInStock": 20,
    },
    {
        "name": "Vangi Bath",
        "image": "/11_VangiBath.jpeg",
        "description": "Spicy and flavorful South Indian eggplant rice.",
        "category": "Indian",
        "price": 8.99,
        "countInStock": 25,
    },
]


def seed_database():
    """Connect to MongoDB and seed the products collection."""
    print("=" * 50)
    print("  EchoEats — Python Data Seeder")
    print("=" * 50)

    try:
        # Connect to MongoDB
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        client.server_info()  # Force connection check
        db = client.get_default_database() if '/' in MONGO_URI.split('://')[-1] else client['ecommerce']
        print(f"✅ Connected to MongoDB: {MONGO_URI}")

        # Add timestamps to each product (mimicking Mongoose timestamps)
        now = datetime.utcnow()
        for product in products:
            product["createdAt"] = now
            product["updatedAt"] = now

        # Clear existing products
        delete_result = db.products.delete_many({})
        print(f"🗑️  Cleared {delete_result.deleted_count} existing products")

        # Insert new products
        insert_result = db.products.insert_many(products)
        print(f"✅ Inserted {len(insert_result.inserted_ids)} products successfully!")

        # Verify by reading back
        count = db.products.count_documents({})
        print(f"📊 Verification: {count} products now in database")

        # Print summary table
        print("\n{:<25} {:<12} {:>8} {:>8}".format("Name", "Category", "Price", "Stock"))
        print("-" * 55)
        for p in db.products.find():
            print("{:<25} {:<12} ${:>6.2f} {:>6}".format(
                p["name"], p["category"], p["price"], p["countInStock"]
            ))

        client.close()
        print(f"\n✅ Seeding complete at {now.strftime('%Y-%m-%d %H:%M:%S UTC')}")

    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    seed_database()
