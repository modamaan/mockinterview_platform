```python
import re

class InputHandler:
    def __init__(self):
        # Define a regex pattern for allowed characters (alphanumeric and basic punctuation)
        self.allowed_pattern = re.compile(r'^[a-zA-Z0-9\s.,!?-]*$')

    def validate_input(self, user_input: str) -> bool:
        """
        Validates the user input to ensure it only contains allowed characters.

        :param user_input: The input string to validate.
        :return: True if the input is valid, False otherwise.
        """
        if self.allowed_pattern.match(user_input):
            return True
        return False

    def sanitize_input(self, user_input: str) -> str:
        """
        Sanitizes the user input by removing any disallowed characters.

        :param user_input: The input string to sanitize.
        :return: A sanitized version of the input string.
        """
        # Remove any characters that do not match the allowed pattern
        sanitized_input = re.sub(r'[^a-zA-Z0-9\s.,!?-]', '', user_input)
        return sanitized_input

    def process_input(self, user_input: str) -> str:
        """
        Processes the user input by validating and sanitizing it.

        :param user_input: The input string to process.
        :return: A sanitized and validated version of the input string.
        """
        if not self.validate_input(user_input):
            print("Warning: Input contains disallowed characters. Sanitizing input.")
            user_input = self.sanitize_input(user_input)
        return user_input

# Example usage
if __name__ == "__main__":
    handler = InputHandler()
    raw_input = input("Enter your input: ")
    safe_input = handler.process_input(raw_input)
    print(f"Processed input: {safe_input}")
```

This code defines an `InputHandler` class that provides methods for validating and sanitizing user input. It uses regular expressions to ensure that the input only contains allowed characters, preventing injection attacks by removing any disallowed characters. The `process_input` method combines validation and sanitization to ensure the input is safe for further processing.