#include <string>
using namespace std;

class HuffmanNode {
    public:
        char key;
        string value;
        HuffmanNode *parent;
        HuffmanNode *left;
        HuffmanNode *right;

        HuffmanNode(const char _key, const string _value, HuffmanNode *_parent)
        {
            this->key = _key;
            this->value = _value;
            this->parent = _parent;
            this->left = nullptr;
            this->right = nullptr;
        }
};

struct HeapNode {
    char data;
    unsigned int frequency;
    struct HeapNode *left, *right;

    HeapNode(char _data, unsigned int _frequency)
    {
        this->data = data;
        this->frequency = _frequency;
        left = nullptr;
        right = nullptr;

    }

// OPERATORS
    bool operator>(const HeapNode& rhs) const { return (this->frequency > rhs.frequency); }
    bool operator<(const HeapNode& rhs) const { return (this->frequency < rhs.frequency); }
    bool operator==(const HeapNode& rhs) const { return (this->data == rhs.data); }

// 

};

class huffman_tree {
private:
    //add your data structures here
    priority_queue<

public:

    /*
    Preconditions: input is a string of characters with ascii values 0-127
    Postconditions: Reads the characters of input and constructs a
    huffman tree based on the character frequencies of the file contents
    */

    huffman_tree(const string& input) {
        
    }


    /*
    Preconditions: input is a character with ascii value between 0-127
    Postconditions: Returns the Huffman code for character if character is in the tree
    and an empty string otherwise.
    */

    string get_character_code(char character) const {
        
        return ""; 
    }


    /*
    Preconditions: input is a string of characters with ascii values 0-127
    Postconditions: Returns the Huffman encoding for the contents of file_name
    if file name exists and an empty string otherwise.
    If the file contains letters not present in the huffman_tree,
    return an empty string
    */

    string encode(const string& input) const { return ""; }


    /*
    Preconditions: string_to_decode is a string containing Huffman-encoded text
    Postconditions: Returns the plaintext represented by the string if the string
    is a valid Huffman encoding and an empty string otherwise
    */

    string decode(const string& string_to_decode) const { return ""; }
};