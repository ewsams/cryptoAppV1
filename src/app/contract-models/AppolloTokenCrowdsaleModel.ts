export interface AppolloTokenCrowdsale {
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
    devdoc: Devdoc;
    userdoc: Userdoc;
}

export interface ABI {
    inputs?: Put[];
    stateMutability?: string;
    type: string;
    anonymous?: boolean;
    name?: string;
    outputs?: Put[];
}

export interface Put {
    internalType: string;
    name: string;
    type: Type;
    indexed?: boolean;
}

export enum Type {
    Address = 'address',
    Uint256 = 'uint256',
}

export interface LegacyASTClass {
    absolutePath: string;
    exportedSymbols: { [key: string]: number[] };
    id: number;
    license: string;
    nodeType: string;
    nodes: ASTNode[];
    src: string;
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
    fullyImplemented?: boolean;
    linearizedBaseContracts?: number[];
    name?: string;
    nodes?: NodeNode[];
}

export interface BaseContractStatement {
    expression?: PurpleExpression;
    id?: number;
    nodeType: TentacledNodeType;
    src: string;
    body?: ASTElement;
    name?: string;
    parameters?: ReturnVariableElement[];
    returnVariables?: ReturnVariableElement[];
    value?: Value;
    variableNames?: ReturnVariableElement[];
    condition?: Ion;
    statements?: StatementStatement[];
}

export interface ASTElement {
    baseName?: BaseName;
    id?: number;
    nodeType: ASTNodeType;
    src: string;
    statements?: BaseContractStatement[];
    expression?: ASTExpression;
    overrides?: any[];
    parameters?: ASTParameter[];
}

export interface Ion {
    arguments: ExpressionValue[];
    functionName: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
}

export interface ExpressionValue {
    kind?: Kind;
    nodeType: ValueNodeType;
    src: string;
    type?: string;
    value?: string;
    arguments?: FluffyArgument[];
    functionName?: ReturnVariableElement;
}

export interface FluffyArgument {
    name?: ArgumentName;
    nodeType: ValueNodeType;
    src: string;
    arguments?: ReturnVariableElement[];
    functionName?: ReturnVariableElement;
}

export interface ReturnVariableElement {
    name: string;
    nodeType: ReturnVariableNodeType;
    src: string;
    type?: string;
}

export enum ReturnVariableNodeType {
    YulIdentifier = 'YulIdentifier',
    YulTypedName = 'YulTypedName',
}

export enum ArgumentName {
    Beneficiary = 'beneficiary',
    DataEnd = 'dataEnd',
    Dst = 'dst',
    HeadStart = 'headStart',
    I = 'i',
    Length = 'length',
    MemPtr = 'memPtr',
    Offset = 'offset',
    Pos = 'pos',
    Tail = 'tail',
    Value = 'value',
    Value0 = 'value0',
    Value1 = 'value1',
    WeiAmount = 'weiAmount',
    X = 'x',
    Y = 'y',
}

export enum ValueNodeType {
    FunctionCall = 'FunctionCall',
    Identifier = 'Identifier',
    Literal = 'Literal',
    YulFunctionCall = 'YulFunctionCall',
    YulIdentifier = 'YulIdentifier',
    YulLiteral = 'YulLiteral',
}

export enum Kind {
    FunctionCall = 'functionCall',
    Number = 'number',
    String = 'string',
}

export interface PurpleExpression {
    id?: number;
    isConstant?: boolean;
    isLValue?: boolean;
    isPure?: boolean;
    lValueRequested?: boolean;
    leftHandSide?: LeftHandSide;
    nodeType: PurpleNodeType;
    operator?: string;
    rightHandSide?: LeftHandSide;
    src: string;
    typeDescriptions?: TypeDescriptions;
    arguments?: TentacledArgument[];
    expression?: ArgumentExpression;
    kind?: Kind;
    names?: any[];
    tryCall?: boolean;
    functionName?: ReturnVariableElement;
}

export interface TentacledArgument {
    id?: number;
    name?: ArgumentName;
    nodeType: ValueNodeType;
    overloadedDeclarations?: any[];
    referencedDeclaration?: number;
    src: string;
    typeDescriptions?: TypeDescriptions;
    arguments?: StickyArgument[];
    expression?: ArgumentExpression;
    isConstant?: boolean;
    isLValue?: boolean;
    isPure?: boolean;
    kind?: Kind;
    lValueRequested?: boolean;
    names?: any[];
    tryCall?: boolean;
    hexValue?: string;
    value?: string;
    functionName?: ReturnVariableElement;
    type?: string;
}

export interface StickyArgument {
    id?: number;
    name?: ArgumentName;
    nodeType: ValueNodeType;
    overloadedDeclarations?: any[];
    referencedDeclaration?: number;
    src: string;
    typeDescriptions?: TypeDescriptions;
    kind?: Kind;
    type?: string;
    value?: string;
}

export interface TypeDescriptions {
    typeIdentifier: string;
    typeString: string;
}

export interface ArgumentExpression {
    argumentTypes: TypeDescriptions[];
    expression?: LeftHandSide;
    id: number;
    isConstant?: boolean;
    isLValue?: boolean;
    isPure?: boolean;
    lValueRequested?: boolean;
    memberName?: string;
    nodeType: string;
    referencedDeclaration: number;
    src: string;
    typeDescriptions: TypeDescriptions;
    name?: string;
    overloadedDeclarations?: number[];
}

export interface LeftHandSide {
    id: number;
    name?: string;
    nodeType: LeftHandSideNodeType;
    overloadedDeclarations?: any[];
    referencedDeclaration?: number;
    src: string;
    typeDescriptions: TypeDescriptions;
    stateMutability?: string;
    pathNode?: BaseName;
}

export enum LeftHandSideNodeType {
    ElementaryTypeName = 'ElementaryTypeName',
    Identifier = 'Identifier',
    UserDefinedTypeName = 'UserDefinedTypeName',
}

export interface BaseName {
    id: number;
    name: BaseNameName;
    nodeType: BaseNameNodeType;
    referencedDeclaration: number;
    src: string;
}

export enum BaseNameName {
    Crowdsale = 'Crowdsale',
    Ierc20 = 'IERC20',
    KycContract = 'KycContract',
}

export enum BaseNameNodeType {
    IdentifierPath = 'IdentifierPath',
}

export enum PurpleNodeType {
    Assignment = 'Assignment',
    FunctionCall = 'FunctionCall',
    YulFunctionCall = 'YulFunctionCall',
}

export enum TentacledNodeType {
    ExpressionStatement = 'ExpressionStatement',
    YulAssignment = 'YulAssignment',
    YulBlock = 'YulBlock',
    YulExpressionStatement = 'YulExpressionStatement',
    YulFunctionDefinition = 'YulFunctionDefinition',
    YulIf = 'YulIf',
}

export interface StatementStatement {
    nodeType: StickyNodeType;
    src: string;
    value: ExpressionValue;
    variables?: ReturnVariableElement[];
    variableNames?: ReturnVariableElement[];
}

export enum StickyNodeType {
    YulAssignment = 'YulAssignment',
    YulBlock = 'YulBlock',
    YulExpressionStatement = 'YulExpressionStatement',
    YulForLoop = 'YulForLoop',
    YulIf = 'YulIf',
    YulVariableDeclaration = 'YulVariableDeclaration',
}

export interface Value {
    arguments?: ValueValue[];
    functionName?: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
    name?: ArgumentName;
}

export interface ValueValue {
    arguments?: ValueValue[];
    functionName?: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
    kind?: Kind;
    type?: string;
    value?: string;
    name?: ArgumentName;
}

export interface ASTExpression {
    id: number;
    isConstant: boolean;
    isLValue: boolean;
    isPure: boolean;
    lValueRequested: boolean;
    leftHandSide?: LeftHandSide;
    nodeType: PurpleNodeType;
    operator?: string;
    rightHandSide?: LeftHandSide;
    src: string;
    typeDescriptions: TypeDescriptions;
    arguments?: PurpleArgument[];
    expression?: ArgumentExpression;
    kind?: Kind;
    names?: any[];
    tryCall?: boolean;
}

export interface PurpleArgument {
    id: number;
    name?: ArgumentName;
    nodeType: ValueNodeType;
    overloadedDeclarations?: any[];
    referencedDeclaration?: number;
    src: string;
    typeDescriptions: TypeDescriptions;
    arguments?: LeftHandSide[];
    expression?: ArgumentExpression;
    isConstant?: boolean;
    isLValue?: boolean;
    isPure?: boolean;
    kind?: Kind;
    lValueRequested?: boolean;
    names?: any[];
    tryCall?: boolean;
    hexValue?: string;
    value?: string;
}

export enum ASTNodeType {
    Block = 'Block',
    ExpressionStatement = 'ExpressionStatement',
    InheritanceSpecifier = 'InheritanceSpecifier',
    OverrideSpecifier = 'OverrideSpecifier',
    ParameterList = 'ParameterList',
    YulBlock = 'YulBlock',
}

export interface ASTParameter {
    constant: boolean;
    id: number;
    mutability: Mutability;
    name: string;
    nameLocation: string;
    nodeType: FluffyNodeType;
    scope: number;
    src: string;
    stateVariable: boolean;
    storageLocation: StorageLocation;
    typeDescriptions: TypeDescriptions;
    typeName: LeftHandSide;
    visibility: Visibility;
}

export enum Mutability {
    Mutable = 'mutable',
}

export enum FluffyNodeType {
    VariableDeclaration = 'VariableDeclaration',
}

export enum StorageLocation {
    Default = 'default',
}

export enum Visibility {
    Internal = 'internal',
}

export interface NodeNode {
    constant?: boolean;
    id: number;
    mutability?: Mutability;
    name: string;
    nameLocation: string;
    nodeType: string;
    scope: number;
    src: string;
    stateVariable?: boolean;
    storageLocation?: StorageLocation;
    typeDescriptions?: TypeDescriptions;
    typeName?: LeftHandSide;
    visibility: string;
    body?: ASTElement;
    implemented?: boolean;
    kind?: string;
    modifiers?: Modifier[];
    parameters?: ASTElement;
    returnParameters?: ASTElement;
    stateMutability?: string;
    virtual?: boolean;
    baseFunctions?: number[];
    overrides?: ASTElement;
}

export interface Modifier {
    arguments: LeftHandSide[];
    id: number;
    modifierName: BaseName;
    nodeType: string;
    src: string;
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
    nodeType: ASTNodeType;
    src: string;
    statements: PurpleStatement[];
}

export interface PurpleStatement {
    body: PurpleBody;
    name: string;
    nodeType: TentacledNodeType;
    parameters?: ReturnVariableElement[];
    returnVariables?: ReturnVariableElement[];
    src: string;
}

export interface PurpleBody {
    nodeType: ASTNodeType;
    src: string;
    statements: FluffyStatement[];
}

export interface FluffyStatement {
    nodeType: StickyNodeType;
    src: string;
    value?: ValueValue;
    variableNames?: ReturnVariableElement[];
    expression?: FluffyExpression;
    body?: FluffyBody;
    condition?: Condition;
    statements?: StatementStatement[];
    variables?: ReturnVariableElement[];
    post?: Post;
    pre?: ASTElement;
}

export interface FluffyBody {
    nodeType: ASTNodeType;
    src: string;
    statements: TentacledStatement[];
}

export interface TentacledStatement {
    expression: Ion;
    nodeType: TentacledNodeType;
    src: string;
}

export interface Condition {
    arguments: ValueValue[];
    functionName: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
}

export interface FluffyExpression {
    arguments: IndigoArgument[];
    functionName: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
}

export interface IndigoArgument {
    name?: ArgumentName;
    nodeType: ValueNodeType;
    src: string;
    arguments?: IndecentArgument[];
    functionName?: ReturnVariableElement;
    kind?: Kind;
    type?: string;
    value?: string;
}

export interface IndecentArgument {
    name?: ArgumentName;
    nodeType: ValueNodeType;
    src: string;
    kind?: Kind;
    type?: string;
    value?: string;
}

export interface Post {
    nodeType: ASTNodeType;
    src: string;
    statements: PostStatement[];
}

export interface PostStatement {
    nodeType: TentacledNodeType;
    src: string;
    value: Value;
    variableNames: ReturnVariableElement[];
}

export interface Devdoc {
    kind: string;
    methods: Methods;
    version: number;
}

export interface Methods {
    'buyTokens(address)': BuyTokensAddress;
    'rate()': Rate;
    'token()': Rate;
    'wallet()': Rate;
    'weiRaised()': Rate;
}

export interface BuyTokensAddress {
    details: string;
    params: Params;
}

export interface Params {
    beneficiary: string;
}

export interface Rate {
    returns: Returns;
}

export interface Returns {
    _0: string;
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
    events: ImmutableReferences;
    links: ImmutableReferences;
    address: string;
    transactionHash: string;
}

export interface Userdoc {
    events: Events;
    kind: string;
    methods: ImmutableReferences;
    version: number;
}

export interface Events {
    'TokensPurchased(address,address,uint256,uint256)': TokensPurchasedAddressAddressUint256Uint256;
}

export interface TokensPurchasedAddressAddressUint256Uint256 {
    notice: string;
}
