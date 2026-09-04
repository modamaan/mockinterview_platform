```python
import sqlite3
from typing import Any, List, Tuple

class Database:
    def __init__(self, db_path: str):
        """Initialize the database connection."""
        self.db_path = db_path
        self.connection = None

    def connect(self):
        """Establish a connection to the SQLite database."""
        try:
            self.connection = sqlite3.connect(self.db_path)
            print("Database connection established.")
        except sqlite3.Error as e:
            print(f"An error occurred while connecting to the database: {e}")

    def close(self):
        """Close the database connection."""
        if self.connection:
            self.connection.close()
            print("Database connection closed.")

    def execute_query(self, query: str, params: Tuple = ()) -> List[Tuple]:
        """
        Execute a SQL query with parameterized inputs to prevent SQL injection.

        :param query: The SQL query to execute.
        :param params: A tuple of parameters to safely include in the query.
        :return: A list of tuples containing the query results.
        """
        if not self.connection:
            raise ValueError("Database connection is not established.")

        cursor = self.connection.cursor()
        try:
            cursor.execute(query, params)
            self.connection.commit()
            results = cursor.fetchall()
            print(f"Query executed successfully: {query}")
            return results
        except sqlite3.Error as e:
            print(f"An error occurred while executing the query: {e}")
            return []
        finally:
            cursor.close()

    def insert_data(self, table: str, data: Tuple):
        """
        Insert data into a specified table using parameterized queries.

        :param table: The name of the table to insert data into.
        :param data: A tuple containing the data to insert.
        """
        if not self.connection:
            raise ValueError("Database connection is not established.")

        placeholders = ', '.join(['?'] * len(data))
        query = f"INSERT INTO {table} VALUES ({placeholders})"
        try:
            self.execute_query(query, data)
            print(f"Data inserted into {table} successfully.")
        except sqlite3.Error as e:
            print(f"An error occurred while inserting data: {e}")

    def fetch_data(self, table: str, columns: List[str], conditions: str = "", params: Tuple = ()) -> List[Tuple]:
        """
        Fetch data from a specified table with optional conditions.

        :param table: The name of the table to fetch data from.
        :param columns: A list of column names to retrieve.
        :param conditions: A string of SQL conditions (e.g., "WHERE id = ?").
        :param params: A tuple of parameters to safely include in the conditions.
        :return: A list of tuples containing the fetched data.
        """
        if not self.connection:
            raise ValueError("Database connection is not established.")

        columns_joined = ', '.join(columns)
        query = f"SELECT {columns_joined} FROM {table} {conditions}"
        try:
            results = self.execute_query(query, params)
            print(f"Data fetched from {table} successfully.")
            return results
        except sqlite3.Error as e:
            print(f"An error occurred while fetching data: {e}")
            return []
```
