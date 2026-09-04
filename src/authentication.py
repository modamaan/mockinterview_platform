```python
import bcrypt
from typing import Tuple

class Authentication:
    def __init__(self):
        # Initialization can include setting up database connections if needed
        pass

    def hash_password(self, password: str) -> Tuple[bytes, bytes]:
        """
        Hash a password for storing.

        :param password: The plain text password to hash.
        :return: A tuple containing the hashed password and the salt used.
        """
        # Generate a salt
        salt = bcrypt.gensalt()
        # Hash the password with the salt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password, salt

    def verify_password(self, password: str, hashed_password: bytes) -> bool:
        """
        Verify a stored password against one provided by user.

        :param password: The plain text password to verify.
        :param hashed_password: The hashed password to compare against.
        :return: True if the password matches, False otherwise.
        """
        # Check if the provided password matches the hashed password
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

# Example usage:
# auth = Authentication()
# hashed_pw, salt = auth.hash_password('my_secure_password')
# is_valid = auth.verify_password('my_secure_password', hashed_pw)
# print(is_valid)  # Should print True if the password is correct
```

This code provides a secure way to handle password storage using hashing and salting with the `bcrypt` library. It includes methods for hashing a password and verifying a password against a stored hash.