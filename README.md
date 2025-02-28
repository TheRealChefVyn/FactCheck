# FactCheck

Automated Social Media Fact-Checking System
1. Project Overview
Type: Browser Extension (Chrome/Firefox)
Target Audience:
English-speaking users in:
Europe (UK, Ireland, Germany, etc.)
North America (USA, Canada)
Australia
Functionality: Detects misinformation in social media posts and provides fact-checked results without storing full claims
2. Tech Stack
Frontend (Browser Extension UI & Display)
Languages: HTML, CSS, JavaScript
Framework: React.js (for interactive UI)
Backend (Fact-Checking & NLP Processing)
Programming Language: Python
Framework: FastAPI (Lightweight, high-performance API)
Alternative Backend (If JS Preferred): Node.js (Express.js)
Database (Minimal Metadata Storage, No Full Claims Stored)
Redis → For short-term caching (reduces API calls)
PostgreSQL → Stores only claim hashes, fact-check sources, and timestamps
Machine Learning & NLP (Text Processing & Claim Verification)
Libraries: Hugging Face Transformers (BERT, RoBERTa), spaCy, NLTK
Pre-trained Models: Fine-tuned models for misinformation detection
Multi-language Support: Extend NLP to process German-language posts
APIs Used
Social Media APIs (X/Twitter, Facebook, Reddit) for post extraction
Fact-Checking APIs:
English Sources: Snopes, PolitiFact, Full Fact, EUvsDisinfo
German Sources: Correctiv, Tagesschau Faktenfinder
3. System Architecture
1. User Flow
User browses social media
Extension detects text-based posts
Backend hashes the claim and checks Redis for existing results
If hash exists → Fetch cached result & display fact-check summary
If hash is new → Run fact-checking, store minimal metadata, and return results
2. Data Handling (No Full Claim Storage)
🔹 Privacy-Focused Approach → Instead of storing full claims, the system will only:

Store hashed fingerprints of processed claims
Keep only metadata (fact-check source, confidence score, timestamp)
Use Redis for caching to avoid redundant fact-checking requests
🔹 Database Usage

Redis (Short-term caching only) → Speeds up repeated fact-checks
PostgreSQL (Minimal metadata storage) → Logs only:
Claim hash (for uniqueness)
Fact-check source (Snopes, PolitiFact, Correctiv, etc.)
Confidence score & timestamp (to track validity)
🔹 How it Works

User submits a post for fact-checking
The system generates a unique hash of the claim
Checks Redis for an existing hash
✅ If found: Fetch cached result (no re-processing)
❌ If not found: Perform NLP analysis and query fact-checking APIs
Stores only metadata (NOT full claim) in PostgreSQL
4. Development Roadmap
Phase 1: Setup & Research (Week 1-2)
Set up GitHub repository & project structure
Research social media & fact-checking APIs
Design claim hashing mechanism (SHA256 or SHA512)
Add multi-language support (English & German)
Phase 2: Build Core Components (Week 3-6)
Develop Browser Extension UI (React.js)
Implement Backend API with FastAPI
Set up Redis for caching & PostgreSQL for metadata storage
Build NLP fact-checking model (English + German)
Phase 3: Integration & Testing (Week 7-9)
Connect frontend with backend
Implement real-time fact-checking using claim hashing
Optimize caching & API efficiency
Phase 4: Deployment & User Testing (Week 10-12)
Deploy backend API on AWS/GCP/Azure
Publish browser extension on Chrome Web Store
Collect user feedback & refine AI model
5. Next Steps
Choose a hashing function (SHA-256, SHA-512)
Expand NLP model to handle English & German text
Create a simple browser extension UI
