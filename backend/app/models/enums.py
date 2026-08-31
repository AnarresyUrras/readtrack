from enum import Enum

class ReadingStatus(str, Enum):
    to_read = "to_read"
    reading = "reading"
    finished = "finished"