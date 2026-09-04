```python
import unittest
from app import sanitize_input, process_user_input

class TestSecurity(unittest.TestCase):
    def test_sanitize_input_removes_sql_injection(self):
        # Test that SQL injection patterns are removed or neutralized
        malicious_input = "1; DROP TABLE users;"
        sanitized = sanitize_input(malicious_input)
        self.assertNotIn("DROP TABLE", sanitized)
        self.assertNotIn(";", sanitized)

    def test_sanitize_input_removes_script_tags(self):
        # Test that script tags are removed to prevent XSS
        malicious_input = "<script>alert('XSS');</script>"
        sanitized = sanitize_input(malicious_input)
        self.assertNotIn("<script>", sanitized)
        self.assertNotIn("</script>", sanitized)

    def test_sanitize_input_handles_quotes(self):
        # Test that quotes are properly escaped or removed
        malicious_input = "' OR '1'='1"
        sanitized = sanitize_input(malicious_input)
        self.assertNotIn("' OR '1'='1", sanitized)

    def test_process_user_input_safe_execution(self):
        # Test that processed input does not execute unsafe operations
        malicious_input = "1; DROP TABLE users;"
        result = process_user_input(malicious_input)
        self.assertNotEqual(result, "Table users dropped")

    def test_process_user_input_handles_html_entities(self):
        # Test that HTML entities are handled correctly
        html_input = "Hello & welcome!"
        result = process_user_input(html_input)
        self.assertEqual(result, "Hello & welcome!")

if __name__ == '__main__':
    unittest.main()
```

This test suite verifies that the `sanitize_input` and `process_user_input` functions handle potentially malicious inputs safely by removing or neutralizing SQL injection patterns, script tags, and other unsafe characters. It also checks that the functions handle HTML entities correctly.