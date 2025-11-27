#!/usr/bin/env python3
"""
Test script to apply for Google jobs using the form automation system
"""

import asyncio
import sys
import os
from pathlib import Path

# Add current directory to path
sys.path.append('.')

from job_application_automator.form_extractor import SimpleFormExtractor
from job_application_automator.form_filler import SimpleFormFiller

async def main():
    print("🚀 Google Jobs Application Test")
    print("=" * 50)
    
    # Test URLs for Google jobs (these are common patterns)
    test_urls = [
        "https://careers.google.com/jobs/results/",
        "https://www.google.com/about/careers/applications/",
        # We'll use a demo URL for testing
        "https://boards.greenhouse.io/google/jobs/5137084003"
    ]
    
    print("🔍 Testing Form Extraction...")
    
    extractor = SimpleFormExtractor()
    
    for url in test_urls:
        print(f"\n📋 Testing URL: {url}")
        try:
            result = await extractor.extract_form_data(url)
            if result:
                print(f"✅ Success! Found {result.get('total_fields', 0)} fields")
                print(f"   Company: {result.get('company', 'Unknown')}")
                print(f"   Job Title: {result.get('job_title', 'Unknown')}")
                
                # If we found a working form, break
                if result.get('total_fields', 0) > 0:
                    print(f"\n🎯 Found working form! Let's proceed with this one.")
                    return result
            else:
                print("❌ No form data extracted")
                
        except Exception as e:
            print(f"❌ Error with {url}: {e}")
            continue
    
    print("\n⚠️ No working forms found in test URLs")
    return None

if __name__ == "__main__":
    result = asyncio.run(main())
    if result:
        print(f"\n🎉 Ready to apply! Form has {result.get('total_fields', 0)} fields to fill.")
    else:
        print("\n❌ Could not find a working application form to test with.")

