import json
import datetime

def lambda_handler(event, context):
    current_time = datetime.datetime.now().isoformat()
    
    return {
        "message": "Hello from Python Lambda!",
        "time": current_time
    }
  
