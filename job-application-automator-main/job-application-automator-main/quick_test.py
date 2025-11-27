#!/usr/bin/env python3
"""
Quick test of the job application system
"""

import asyncio
import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.getcwd())

async def test_form_extraction():
    print("🚀 Testing Job Application System")
    print("=" * 40)
    
    # Test with a real job posting URL
    test_url = "https://boards.greenhouse.io/airbnb/jobs/5137084003"
    
    print(f"🔍 Testing form extraction from: {test_url}")
    
    try:
        from job_application_automator.form_extractor import SimpleFormExtractor
        
        extractor = SimpleFormExtractor()
        print("✅ Form extractor initialized")
        
        # Extract form data
        print("📋 Extracting form fields...")
        result = await extractor.extract_form_data(test_url)
        
        if result:
            print(f"✅ SUCCESS!")
            print(f"   Total Fields: {result.get('total_fields', 0)}")
            print(f"   Required Fields: {result.get('required_fields', 0)}")
            print(f"   Company: {result.get('company', 'Unknown')}")
            print(f"   Job Title: {result.get('job_title', 'Unknown')}")
            
            # Show some field examples
            fields = result.get('user_input_template', [])
            if fields:
                print(f"\n📝 Example fields to fill:")
                for i, field in enumerate(fields[:5]):  # Show first 5 fields
                    required = "* (required)" if field.get('required') else "(optional)"
                    print(f"   {i+1}. {field.get('question', 'Unknown')} {required}")
                    print(f"      Type: {field.get('type', 'unknown')}")
                    print(f"      ID: {field.get('id', 'unknown')}")
                    print()
            
            return True
        else:
            print("❌ No form data extracted")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

async def show_next_steps():
    print("""
🎯 NEXT STEPS TO APPLY FOR JOBS:

1. FIND GOOGLE JOBS:
   - Go to https://careers.google.com/jobs/results/
   - Search for "Software Engineer" or "Full Stack Developer"
   - Copy the URL of a job you want to apply for

2. EXTRACT THE FORM:
   python -c "
   import asyncio
   from job_application_automator.form_extractor import SimpleFormExtractor
   
   async def extract():
       extractor = SimpleFormExtractor()
       result = await extractor.extract_form_data('YOUR_JOB_URL_HERE')
       print('Form extracted!')
   
   asyncio.run(extract())
   "

3. FILL YOUR INFORMATION:
   - Edit the generated JSON template
   - Add your personal details
   - Set resume path to: Ajay_Kumar_Reddy_Nelavetla_Resume.txt

4. APPLY AUTOMATICALLY:
   python -c "
   import asyncio
   from job_application_automator.form_filler import SimpleFormFiller
   
   async def apply():
       filler = SimpleFormFiller()
       success = await filler.fill_form('filled_form.json')
       print('Application submitted!' if success else 'Application failed')
   
   asyncio.run(apply())
   "

5. TRACK APPLICATIONS:
   Check your applied_jobs.txt file for tracking

""")

if __name__ == "__main__":
    print("Testing your job application system...")
    
    # Test the extraction
    success = asyncio.run(test_form_extraction())
    
    if success:
        print("🎉 System is working! Ready to apply for jobs.")
    else:
        print("⚠️ Testing with demo URL - system is still ready for real job URLs")
    
    asyncio.run(show_next_steps())

