from enum import Enum

class ReadingStatus(str, Enum):
    to_read = "to_read"
    reading = "reading"
    finished = "finished"

class AuthorGender(str, Enum):
    male = "male"
    female = "female"
    non_binary = "non_binary"
    unknown = "unknown"
