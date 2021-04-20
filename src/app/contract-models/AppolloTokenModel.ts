export interface AppolloToken {
    contractName: string;
    abi: ABI[];
    metadata: string;
    bytecode: string;
    deployedBytecode: string;
    immutableReferences: ImmutableReferences;
    generatedSources: GeneratedSource[];
    deployedGeneratedSources: DeployedGeneratedSource[];
    sourceMap: string;
    deployedSourceMap: string;
    source: string;
    sourcePath: string;
    ast: LegacyASTClass;
    legacyAST: LegacyASTClass;
    compiler: Compiler;
    networks: Networks;
    schemaVersion: string;
    updatedAt: Date;
    networkType: string;
    devdoc: Devdoc;
    userdoc: Userdoc;
}

export interface ABI {
    inputs: Put[];
    stateMutability?: StateMutability;
    type: Type;
    anonymous?: boolean;
    name?: string;
    outputs?: Put[];
    constant?: boolean;
}

export interface Put {
    internalType: InternalType;
    name: string;
    type: InternalType;
    indexed?: boolean;
}

export enum InternalType {
    Address = 'address',
    Bool = 'bool',
    String = 'string',
    Uint256 = 'uint256',
    Uint8 = 'uint8',
}

export enum StateMutability {
    Nonpayable = 'nonpayable',
    View = 'view',
}

export enum Type {
    Constructor = 'constructor',
    Event = 'event',
    Function = 'function',
}

export interface LegacyASTClass {
    absolutePath: string;
    exportedSymbols: ExportedSymbols;
    id: number;
    license: string;
    nodeType: string;
    nodes: ASTNode[];
    src: string;
}

export interface ExportedSymbols {
    AppolloToken: number[];
    Context: number[];
    ERC20: number[];
    IERC20: number[];
}

export interface ASTNode {
    id: number;
    literals?: string[];
    nodeType: string;
    src: string;
    absolutePath?: string;
    file?: string;
    nameLocation?: string;
    scope?: number;
    sourceUnit?: number;
    symbolAliases?: any[];
    unitAlias?: string;
    abstract?: boolean;
    baseContracts?: ASTElement[];
    contractDependencies?: number[];
    contractKind?: string;
    documentation?: ASTElement;
    fullyImplemented?: boolean;
    linearizedBaseContracts?: number[];
    name?: string;
    nodes?: NodeNode[];
}

export interface DocumentationStatement {
    expression?: PurpleExpression;
    id?: number;
    nodeType: StatementNodeType;
    src: string;
    body?: ASTElement;
    name?: string;
    parameters?: ReturnVariableElement[];
    returnVariables?: ReturnVariableElement[];
    value?: PurpleValue;
    variableNames?: ReturnVariableElement[];
    condition?: Ion;
    statements?: StatementStatement[];
    variables?: ReturnVariableElement[];
}

export interface ASTElement {
    baseName?: Name;
    id?: number;
    nodeType: string;
    src: string;
    text?: string;
    statements?: DocumentationStatement[];
    expression?: ASTExpression;
    parameters?: ASTParameter[];
}

export interface Ion {
    arguments: ValueElement[];
    functionName: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
}

export interface ValueElement {
    name?: string;
    nodeType: ValueNodeType;
    src: string;
    kind?: Kind;
    type?: string;
    value?: string;
    arguments?: FluffyArgument[];
    functionName?: ReturnVariableElement;
}

export interface FluffyArgument {
    name?: string;
    nodeType: ValueNodeType;
    src: string;
    kind?: Kind;
    type?: string;
    value?: string;
    arguments?: TentacledArgument[];
    functionName?: ReturnVariableElement;
}

export interface TentacledArgument {
    name?: string;
    nodeType: ValueNodeType;
    src: string;
    kind?: Kind;
    type?: string;
    value?: string;
}

export enum Kind {
    Number = 'number',
    String = 'string',
}

export enum ValueNodeType {
    Identifier = 'Identifier',
    MemberAccess = 'MemberAccess',
    YulFunctionCall = 'YulFunctionCall',
    YulIdentifier = 'YulIdentifier',
    YulLiteral = 'YulLiteral',
}

export interface ReturnVariableElement {
    name: string;
    nodeType: ParameterNodeType;
    src: string;
    type?: string;
}

export enum ParameterNodeType {
    YulIdentifier = 'YulIdentifier',
    YulTypedName = 'YulTypedName',
}

export interface PurpleExpression {
    arguments: StickyArgument[];
    expression?: ArgumentExpression;
    id?: number;
    isConstant?: boolean;
    isLValue?: boolean;
    isPure?: boolean;
    kind?: string;
    lValueRequested?: boolean;
    names?: any[];
    nodeType: PurpleNodeType;
    src: string;
    tryCall?: boolean;
    typeDescriptions?: TypeDescriptions;
    functionName?: ReturnVariableElement;
}

export interface StickyArgument {
    expression?: ArgumentExpression;
    id?: number;
    isConstant?: boolean;
    isLValue?: boolean;
    isPure?: boolean;
    lValueRequested?: boolean;
    memberName?: string;
    nodeType: ValueNodeType;
    src: string;
    typeDescriptions?: TypeDescriptions;
    name?: string;
    overloadedDeclarations?: any[];
    referencedDeclaration?: number;
    arguments?: ValueElement[];
    functionName?: ReturnVariableElement;
    kind?: Kind;
    type?: string;
    value?: string;
}

export interface ArgumentExpression {
    id: number;
    name: string;
    nodeType: ValueNodeType;
    overloadedDeclarations: any[];
    referencedDeclaration: number;
    src: string;
    typeDescriptions: TypeDescriptions;
    argumentTypes?: TypeDescriptions[];
}

export interface TypeDescriptions {
    typeIdentifier: string;
    typeString: string;
}

export enum PurpleNodeType {
    FunctionCall = 'FunctionCall',
    YulFunctionCall = 'YulFunctionCall',
}

export enum StatementNodeType {
    ExpressionStatement = 'ExpressionStatement',
    YulAssignment = 'YulAssignment',
    YulBlock = 'YulBlock',
    YulExpressionStatement = 'YulExpressionStatement',
    YulForLoop = 'YulForLoop',
    YulFunctionDefinition = 'YulFunctionDefinition',
    YulIf = 'YulIf',
    YulVariableDeclaration = 'YulVariableDeclaration',
}

export interface StatementStatement {
    nodeType: StatementNodeType;
    src: string;
    value: ArgumentElement;
    variables?: ReturnVariableElement[];
    variableNames?: ReturnVariableElement[];
}

export interface ArgumentElement {
    kind?: Kind;
    nodeType: ValueNodeType;
    src: string;
    type?: string;
    value?: string;
    arguments?: IndigoArgument[];
    functionName?: ReturnVariableElement;
}

export interface IndigoArgument {
    name?: string;
    nodeType: ValueNodeType;
    src: string;
    arguments?: ReturnVariableElement[];
    functionName?: ReturnVariableElement;
}

export interface PurpleValue {
    arguments?: ValueElement[];
    functionName?: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
    name?: string;
}

export interface Name {
    id: number;
    name: string;
    nodeType: string;
    referencedDeclaration?: number;
    src: string;
    typeDescriptions?: TypeDescriptions;
}

export interface ASTExpression {
    arguments: PurpleArgument[];
    expression: ArgumentExpression;
    id: number;
    isConstant: boolean;
    isLValue: boolean;
    isPure: boolean;
    kind: string;
    lValueRequested: boolean;
    names: any[];
    nodeType: PurpleNodeType;
    src: string;
    tryCall: boolean;
    typeDescriptions: TypeDescriptions;
}

export interface PurpleArgument {
    expression?: ArgumentExpression;
    id: number;
    isConstant?: boolean;
    isLValue?: boolean;
    isPure?: boolean;
    lValueRequested?: boolean;
    memberName?: string;
    nodeType: ValueNodeType;
    src: string;
    typeDescriptions: TypeDescriptions;
    name?: string;
    overloadedDeclarations?: any[];
    referencedDeclaration?: number;
}

export interface ASTParameter {
    constant: boolean;
    id: number;
    mutability: string;
    name: string;
    nameLocation: string;
    nodeType: string;
    scope: number;
    src: string;
    stateVariable: boolean;
    storageLocation: string;
    typeDescriptions: TypeDescriptions;
    typeName: Name;
    visibility: string;
}

export interface NodeNode {
    body: ASTElement;
    documentation: ASTElement;
    id: number;
    implemented: boolean;
    kind: Type;
    modifiers: Modifier[];
    name: string;
    nameLocation: string;
    nodeType: string;
    parameters: ASTElement;
    returnParameters: ASTElement;
    scope: number;
    src: string;
    stateMutability: StateMutability;
    virtual: boolean;
    visibility: string;
}

export interface Modifier {
    arguments: ModifierArgument[];
    id: number;
    modifierName: Name;
    nodeType: string;
    src: string;
}

export interface ModifierArgument {
    hexValue: string;
    id: number;
    isConstant: boolean;
    isLValue: boolean;
    isPure: boolean;
    kind: InternalType;
    lValueRequested: boolean;
    nodeType: string;
    src: string;
    typeDescriptions: TypeDescriptions;
    value: string;
}

export interface Compiler {
    name: string;
    version: string;
}

export interface DeployedGeneratedSource {
    ast: DeployedGeneratedSourceAST;
    contents: string;
    id: number;
    language: string;
    name: string;
}

export interface DeployedGeneratedSourceAST {
    nodeType: StatementNodeType;
    src: string;
    statements: PurpleStatement[];
}

export interface PurpleStatement {
    body: PurpleBody;
    name: string;
    nodeType: StatementNodeType;
    parameters?: ReturnVariableElement[];
    returnVariables?: ReturnVariableElement[];
    src: string;
}

export interface PurpleBody {
    nodeType: StatementNodeType;
    src: string;
    statements: FluffyStatement[];
}

export interface FluffyStatement {
    nodeType: StatementNodeType;
    src: string;
    value?: ValueElement;
    variableNames?: ReturnVariableElement[];
    expression?: Ion;
    body?: PostClass;
    condition?: Ion;
    statements?: StatementStatement[];
    variables?: ReturnVariableElement[];
    post?: PostClass;
    pre?: ASTElement;
}

export interface PostClass {
    nodeType: StatementNodeType;
    src: string;
    statements: PostStatement[];
}

export interface PostStatement {
    expression?: FluffyExpression;
    nodeType: StatementNodeType;
    src: string;
    value?: PurpleValue;
    variableNames?: ReturnVariableElement[];
}

export interface FluffyExpression {
    arguments: ArgumentElement[];
    functionName: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
}

export interface Devdoc {
    details: string;
    kind: string;
    methods: { [key: string]: Method };
    title: string;
    version: number;
}

export interface Method {
    details: string;
}

export interface GeneratedSource {
    ast: ASTElement;
    contents: string;
    id: number;
    language: string;
    name: string;
}

export interface ImmutableReferences {
}

export interface Networks {
    '5777': The5777;
}

export interface The5777 {
    events: { [key: string]: Event };
    links: ImmutableReferences;
    address: string;
    transactionHash: string;
}

export interface Event {
    anonymous: boolean;
    inputs: Put[];
    name: string;
    type: Type;
}

export interface Userdoc {
    kind: string;
    methods: ImmutableReferences;
    version: number;
}
