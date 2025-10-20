#!/usr/bin/env python3
"""
Apply to Google Jobs - Complete Demo
"""

import asyncio
import json
import os
from pathlib import Path
from job_application_automator.form_extractor import SimpleFormExtractor

async def main():
    print("🚀 APPLYING TO GOOGLE JOBS")
    print("=" * 50)
    
    # Your resume file path
    resume_path = "Ajay_Kumar_Reddy_Nelavetla_Resume.txt"
    
    print(f"📄 Resume: {resume_path}")
    print(f"👤 Candidate: Ajay Kumar Reddy Nelavetla")
    print(f"💼 Experience: 4 years Full Stack Development")
    print(f"📍 Location: Boston, MA")
    
    # Let's try some actual Google job URLs
    google_urls = [
        # Google Careers - Software Engineer positions
        "https://careers.google.com/jobs/results/79564698291511046-software-engineer-early-career-google-cloud",
        "https://careers.google.com/jobs/results/103600845383664326-software-engineer-google-cloud-platforms",
        "https://careers.google.com/jobs/results/138512739503809222-software-engineer-frontend",
        
        # Alternative: Try Greenhouse-based Google applications
        "https://boards.greenhouse.io/google/jobs/5137084003",
        "https://boards.greenhouse.io/google/jobs/5000000003",
    ]
    
    print(f"\n🔍 Testing {len(google_urls)} Google job URLs...")
    
    extractor = SimpleFormExtractor()
    
    for i, url in enumerate(google_urls, 1):
        print(f"\n[{i}/{len(google_urls)}] Testing: {url}")
        
        try:
            result = await extractor.extract_form_data(url)
            
            if result and result.get('total_fields', 0) > 0:
                print(f"✅ SUCCESS! Found application form!")
                print(f"   📊 Total Fields: {result.get('total_fields', 0)}")
                print(f"   ⚠️ Required Fields: {result.get('required_fields', 0)}")
                print(f"   🏢 Company: {result.get('company', 'Unknown')}")
                print(f"   💼 Job Title: {result.get('job_title', 'Unknown')}")
                
                # Save the form data
                timestamp = result.get('timestamp', 'unknown')
                output_file = f"google_job_form_{timestamp}.json"
                
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(result, f, indent=2, ensure_ascii=False)
                
                print(f"   💾 Form data saved to: {output_file}")
                print(f"\n🎯 READY TO APPLY!")
                print(f"Next steps:")
                print(f"1. Fill in your details in the template")
                print(f"2. Run form filler to apply automatically")
                
                return result
            else:
                print(f"❌ No form found or no fields detected")
                
        except Exception as e:
            print(f"❌ Error: {e}")
            continue
    
    print(f"\n⚠️ No working Google application forms found in test URLs")
    print(f"💡 Alternative: Try finding a specific Google job posting and use that URL")
    
    return None

if __name__ == "__main__":
    result = asyncio.run(main())
    
    if result:
        print(f"\n🎉 SUCCESS! Found a Google job application form to fill!")
    else:
        print(f"\n💡 Try with a specific Google job URL from careers.google.com")

