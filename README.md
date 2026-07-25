# Ratio — A Two-Agent AI Investment Analyst

Ratio is an AI-powered sequential investment analysis system built with 
IBM Bob, IBM watsonx Orchestrate, and IBM Granite models, developed for 
the IBM University Engagement Program (Problem Statement No. 4: 
Sequential Task Agent – Investment Analyst).

## Overview

Instead of producing a single opaque recommendation, Ratio splits 
investment analysis into two coordinated agents:

- **Ledger** — retrieves and validates company financial data (RAG-grounded), 
  flagging missing or inconsistent figures rather than guessing.
- **Verdict** — takes Ledger's validated summary and performs ratio 
  analysis, competitor benchmarking, sentiment assessment, and produces 
  a final recommendation with clear, traceable reasoning.

This two-agent handoff mirrors how a real analyst team separates data 
integrity from judgment, keeping the reasoning process auditable at 
every step.

## Tech Stack

- IBM Bob — application generation and orchestration
- IBM watsonx Orchestrate — agent definition and coordination
- IBM Granite models — reasoning and generation
- Retrieval-Augmented Generation (RAG) over company financial documents
- Vector database (FAISS/Chroma) for document retrieval
- Flask (backend), HTML/CSS (frontend)

## How It Works

1. User submits company financial data (documents, news snippets).
2. **Ledger** extracts and validates key metrics, flagging gaps.
3. **Verdict** calculates ratios, benchmarks against competitors, 
   assesses sentiment, and issues a recommendation with justification.

## Repository Contents

- `app.py` — backend application logic
- `requirements.txt` — dependencies
- `style.css`, `index.html` — frontend
- `.env` — environment configuration (not committed with real keys)
- `problem_statement.pdf` — original problem statement
- `Ratio_Project_Presentation.pptx` — full project presentation

## Disclaimer

Ratio produces analytical summaries for demonstration purposes only 
and does not constitute financial advice.
