type ParsedInput = { inputType: "query" | "add", input: string }

export class DuplicatePasswordChecker {
    substringsCount: Map<string, number> = new Map();

    handlePasswordInputs(inputs: string[]): string[] {
        const handlePasswordOutput = []
        for (const inp of inputs) {
            const {inputType, input} = this.parseInput(inp);
            if (inputType == "add") {
                this.handleAddPassword(input);
                handlePasswordOutput.push("");
            } else if (inputType == "query") {
                handlePasswordOutput.push((this.checkSubstringCount(input).toString()));
            }
        }
        return handlePasswordOutput;
    }

    checkSubstringCount(queryString: string): number {
        return this.substringsCount.get(queryString) || 0;
    }

    handleAddPassword(queryString: string): void {
        const alreadySeenString = new Set();
        for (let start=0; start<queryString.length; start++) {
            for (let end=start+1; end<queryString.length+1; end++) {
                const substring = queryString.slice(start, end);
                let substringCount = this.checkSubstringCount(substring);
                if (!alreadySeenString.has(substring))
                    this.substringsCount.set(substring, ++substringCount);
                alreadySeenString.add(substring);
            }
        }
    }

    parseInput(queryString: string): ParsedInput {
        const [inputType, input] = queryString.split(" ");

        if (inputType != "query" && inputType != "add")
            throw new Error("incorrect input type")

        return {
            inputType,
            input,
        }
    }
}