export interface KycContractModel {
    contractName: string;
    abi: ABI[];
    metadata: string;
    bytecode: string;
    deployedBytecode: string;
    immutableReferences: ImmutableReferences;
    generatedSources: any[];
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
    anonymous?: boolean;
    inputs: Put[];
    name: string;
    type: string;
    outputs?: Put[];
    stateMutability?: string;
    constant?: boolean;
}

export interface Put {
    indexed?: boolean;
    internalType: InternalType;
    name: string;
    type: InternalType;
}

export enum InternalType {
    Address = 'address',
    Bool = 'bool',
    MappingAddressBool = 'mapping(address => bool)',
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
    Context: number[];
    KycContract: number[];
    Ownable: number[];
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
    baseContracts?: BaseContract[];
    contractDependencies?: number[];
    contractKind?: string;
    fullyImplemented?: boolean;
    linearizedBaseContracts?: number[];
    name?: string;
    nodes?: NodeNode[];
}

export interface BaseContract {
    baseName?: Name;
    id: number;
    nodeType: BaseContractNodeType;
    src: string;
    statements?: BaseContractStatement[];
    parameters?: BaseContractParameter[];
}

export interface Name {
    id: number;
    name: string;
    nodeType: BaseNameNodeType;
    referencedDeclaration: number;
    src: string;
}

export enum BaseNameNodeType {
    ElementaryTypeName = 'ElementaryTypeName',
    IdentifierPath = 'IdentifierPath',
}

export enum BaseContractNodeType {
    Block = 'Block',
    InheritanceSpecifier = 'InheritanceSpecifier',
    ParameterList = 'ParameterList',
}

export interface BaseContractParameter {
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
    typeName: ParameterTypeName;
    visibility: string;
}

export interface TypeDescriptions {
    typeIdentifier: TypeIdentifier;
    typeString: InternalType;
}

export enum TypeIdentifier {
    TAddress = 't_address',
    TBool = 't_bool',
    TMappingTAddressTBool = 't_mapping$_t_address_$_t_bool_$',
}

export interface ParameterTypeName {
    id: number;
    name: InternalType;
    nodeType: BaseNameNodeType;
    src: string;
    stateMutability?: string;
    typeDescriptions: TypeDescriptions;
}

export interface BaseContractStatement {
    expression: LeftHandSideClass;
    id: number;
    nodeType: string;
    src: string;
    functionReturnParameters?: number;
}

export interface LeftHandSideClass {
    id: number;
    isConstant: boolean;
    isLValue: boolean;
    isPure: boolean;
    lValueRequested: boolean;
    leftHandSide?: LeftHandSideClass;
    nodeType: LeftHandSideNodeType;
    operator?: string;
    rightHandSide?: RightHandSide;
    src: string;
    typeDescriptions: TypeDescriptions;
    baseExpression?: Expression;
    indexExpression?: Expression;
}

export interface Expression {
    id: number;
    name: NameEnum;
    nodeType: BaseExpressionNodeType;
    overloadedDeclarations: any[];
    referencedDeclaration: number;
    src: string;
    typeDescriptions: TypeDescriptions;
}

export enum NameEnum {
    Addr = '_addr',
    Allowed = 'allowed',
}

export enum BaseExpressionNodeType {
    Identifier = 'Identifier',
}

export enum LeftHandSideNodeType {
    Assignment = 'Assignment',
    IndexAccess = 'IndexAccess',
}

export interface RightHandSide {
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

export interface NodeNode {
    constant?: boolean;
    id: number;
    mutability?: string;
    name: string;
    nameLocation: string;
    nodeType: string;
    scope: number;
    src: string;
    stateVariable?: boolean;
    storageLocation?: string;
    typeDescriptions?: TypeDescriptions;
    typeName?: NodeTypeName;
    visibility: string;
    body?: BaseContract;
    functionSelector?: string;
    implemented?: boolean;
    kind?: string;
    modifiers?: Modifier[];
    parameters?: BaseContract;
    returnParameters?: BaseContract;
    stateMutability?: string;
    virtual?: boolean;
}

export interface Modifier {
    id: number;
    kind: string;
    modifierName: Name;
    nodeType: string;
    src: string;
}

export interface NodeTypeName {
    id: number;
    keyType: KeyType;
    nodeType: string;
    src: string;
    typeDescriptions: TypeDescriptions;
    valueType: ValueType;
}

export interface KeyType {
    id: number;
    name: InternalType;
    nodeType: BaseNameNodeType;
    src: string;
    typeDescriptions: TypeDescriptions;
}

export interface ValueType {
    id: number;
    name: string;
    nodeType: BaseNameNodeType;
    src: string;
    stateMutability?: string;
    typeDescriptions?: TypeDescriptions;
    referencedDeclaration?: number;
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
    statements: ASTStatement[];
}

export enum ASTNodeType {
    YulAssignment = 'YulAssignment',
    YulBlock = 'YulBlock',
    YulExpressionStatement = 'YulExpressionStatement',
    YulIf = 'YulIf',
}

export interface ASTStatement {
    body: PurpleBody;
    name: string;
    nodeType: PurpleNodeType;
    parameters: ReturnVariableElement[];
    returnVariables?: ReturnVariableElement[];
    src: string;
}

export interface PurpleBody {
    nodeType: ASTNodeType;
    src: string;
    statements: PurpleStatement[];
}

export interface PurpleStatement {
    nodeType: ASTNodeType;
    src: string;
    value?: ValueClass;
    variableNames?: ReturnVariableElement[];
    expression?: ValueClass;
    body?: FluffyBody;
    condition?: Condition;
    statements?: StatementStatement[];
}

export interface FluffyBody {
    nodeType: ASTNodeType;
    src: string;
    statements: FluffyStatement[];
}

export interface FluffyStatement {
    expression: PurpleExpression;
    nodeType: ASTNodeType;
    src: string;
}

export interface PurpleExpression {
    arguments: PurpleArgument[];
    functionName: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
}

export interface PurpleArgument {
    kind: Kind;
    nodeType: ValueNodeType;
    src: string;
    type: string;
    value: string;
}

export enum Kind {
    Number = 'number',
    String = 'string',
}

export enum ValueNodeType {
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

export interface Condition {
    arguments: ValueElement[];
    functionName: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
}

export interface ValueElement {
    arguments?: FluffyArgument[];
    functionName?: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
    kind?: Kind;
    type?: string;
    value?: string;
}

export interface FluffyArgument {
    name?: string;
    nodeType: ValueNodeType;
    src: string;
    arguments?: ReturnVariableElement[];
    functionName?: ReturnVariableElement;
}

export interface ValueClass {
    arguments: TentacledArgument[];
    functionName: ReturnVariableElement;
    nodeType: ValueNodeType;
    src: string;
}

export interface TentacledArgument {
    name?: string;
    nodeType: ValueNodeType;
    src: string;
    arguments?: StickyArgument[];
    functionName?: ReturnVariableElement;
    kind?: Kind;
    type?: string;
    value?: string;
}

export interface StickyArgument {
    name?: string;
    nodeType: ValueNodeType;
    src: string;
    kind?: Kind;
    type?: string;
    value?: string;
}

export interface StatementStatement {
    nodeType: string;
    src: string;
    value: ValueElement;
    variables?: ReturnVariableElement[];
    variableNames?: ReturnVariableElement[];
}

export enum PurpleNodeType {
    YulFunctionDefinition = 'YulFunctionDefinition',
}

export interface Devdoc {
    kind: string;
    methods: Methods;
    version: number;
}

export interface Methods {
    'owner()': Owner;
    'renounceOwnership()': Owner;
    'transferOwnership(address)': Owner;
}

export interface Owner {
    details: string;
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
    kind: string;
    methods: ImmutableReferences;
    version: number;
}
