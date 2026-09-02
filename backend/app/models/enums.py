from enum import Enum

class ReadingStatus(str, Enum):
    to_read = "to_read"
    read = "read"
    in_library = "in_library"

class AuthorGender(str, Enum):
    female = "female"
    male = "male"
    diverse = "diverse"
    
class BookFormat(str, Enum):
    paperback = "paperback"
    ebook = "ebook"
    audiobook = "audiobook"
