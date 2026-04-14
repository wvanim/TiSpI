function parseTispi(input) {
    // Nettoyage
    input = input
        .replace(/\/\/.*$/gm, "") // enlever commentaires
        .replace(/\s+/g, " ")
        .trim();

    let index = 0;

    function peek() {
        return input[index];
    }

    function consume() {
        return input[index++];
    }

    function consumeWhile(regex) {
        let start = index;
        while (regex.test(input[index])) index++;
        return input.slice(start, index);
    }

    function skipSpaces() {
        while (/\s/.test(peek())) consume();
    }

    function parseString() {
        if (peek() !== '"') return null;
        consume(); // "
        let str = "";
        while (peek() !== '"') {
            str += consume();
        }
        consume(); // "
        return str;
    }

    function parseWord() {
        return consumeWhile(/[a-zA-Z0-9_@]/);
    }

    function parseParams() {
        let params = [];

        while (true) {
            skipSpaces();
            if (peek() === "[" || peek() === ";" || peek() === "]") break;

            if (peek() === '"') {
                params.push(parseString());
            } else {
                params.push(parseWord());
            }

            skipSpaces();
            if (peek() === ",") consume();
        }

        return params;
    }

    function parsePieceOrFace() {
        skipSpaces();

        if (input.startsWith("PF", index)) {
            index += 2;
            return parsePF();
        }

        if (peek() === "P") {
            consume();
            return parsePiece();
        }

        if (peek() === "F") {
            consume();
            return parseFace();
        }

        return null;
    }

    function parsePiece() {
        skipSpaces();

        let label = null;

        if (peek() === '"') {
            label = parseString();
        }

        let node = {
            type: "P",
            label,
            children: []
        };

        skipSpaces();

        if (peek() === "[") {
            consume(); // [

            while (true) {
                skipSpaces();
                if (peek() === "]") {
                    consume();
                    break;
                }

                let child = parsePieceOrFace();
                if (child) node.children.push(child);

                skipSpaces();
                if (peek() === ";") consume();
            }
        }

        return node;
    }

    function parseFace() {
        skipSpaces();

        // type
        let faceType = parseWord();

        skipSpaces();
        if (peek() === ",") consume();

        let params = parseParams();

        let node = {
            type: "F",
            faceType,
            params,
            children: []
        };

        skipSpaces();

        if (peek() === "[") {
            consume();

            while (true) {
                skipSpaces();
                if (peek() === "]") {
                    consume();
                    break;
                }

                let child = parsePieceOrFace();
                if (child) node.children.push(child);

                skipSpaces();
                if (peek() === ";") consume();
            }
        }

        return node;
    }

    function parsePF() {
        skipSpaces();

        let faceType = parseWord();

        skipSpaces();
        if (peek() === ",") consume();

        let label = null;
        if (peek() === '"') {
            label = parseString();
        }

        let params = parseParams();

        let node = {
            type: "PF",
            faceType,
            label,
            params,
            children: []
        };

        skipSpaces();

        if (peek() === "[") {
            consume();

            while (true) {
                skipSpaces();
                if (peek() === "]") {
                    consume();
                    break;
                }

                let child = parsePieceOrFace();
                if (child) node.children.push(child);

                skipSpaces();
                if (peek() === ";") consume();
            }
        }

        return node;
    }

    // root
    let result = [];

    while (index < input.length) {
        let node = parsePieceOrFace();
        if (node) result.push(node);
        skipSpaces();
    }

    return result;
}