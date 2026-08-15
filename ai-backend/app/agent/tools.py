"""
OpenAI function-calling tool definitions for the portfolio agent.
Currently implements: send_contact_message
"""

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "send_contact_message",
            "description": (
                "Saves a contact message from a visitor to Priyanshu's database. "
                "ONLY call this after the visitor has explicitly confirmed they want "
                "to send the message. You must have collected all three fields first."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "The full name of the visitor sending the message.",
                    },
                    "email": {
                        "type": "string",
                        "description": "The visitor's email address (must look like a valid email).",
                    },
                    "message": {
                        "type": "string",
                        "description": "The content of the message the visitor wants to send.",
                    },
                },
                "required": ["name", "email", "message"],
                "additionalProperties": False,
            },
            "strict": True,
        },
    }
]
