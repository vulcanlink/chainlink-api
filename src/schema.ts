import { nexusPrismaPlugin } from 'nexus-prisma'
import { idArg, makeSchema, objectType, interfaceType, stringArg, subscriptionField, intArg } from 'nexus'
import { transformSchemaFederation } from 'graphql-transform-federation';
import { delegateToSchema } from 'graphql-tools';

const excludedFields = new Set([
    "incoming_token_hash",
    "salt",
    "outgoing_token",
    "hashed_secret",
    "outgoing_secret",
    "access_key"
])

/*
const Node = interfaceType({
    name: 'Node',
    definition(t) {
        //t.id('id', o => o.id)
        t.resolveType(() => null)
    },
})
*/

const BridgeType = objectType({
    name: 'BridgeType',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const ExternalInitiator = objectType({
    name: 'ExternalInitiator',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const Head = objectType({
    name: 'Head',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const Initiator = objectType({
    name: 'Initiator',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const JobRun = objectType({
    name: 'JobRun',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const JobSpec = objectType({
    name: 'JobSpec',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const RunRequest = objectType({
    name: 'RunRequest',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const RunResult = objectType({
    name: 'RunResult',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const ServiceAgreement = objectType({
    name: 'ServiceAgreement',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const TaskRun = objectType({
    name: 'TaskRun',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const TaskSpec = objectType({
    name: 'TaskSpec',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const TxAttempt = objectType({
    name: 'TxAttempt',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const Tx = objectType({
    name: 'Tx',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const Configuration = objectType({
    name: 'Configuration',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.bridgeType();
        t.crud.bridgeTypes();
        t.crud.externalInitiator();
        t.crud.externalInitiators();
        t.crud.head();
        t.crud.heads();
        t.crud.initiator();
        t.crud.initiators();
        t.crud.jobRun();
        t.crud.jobRuns();
        t.crud.jobSpec();
        t.crud.jobSpecs();
        t.crud.runRequest();
        t.crud.runRequests();
        t.crud.runResult();
        t.crud.runResults();
        t.crud.serviceAgreement();
        t.crud.serviceAgreements();
        t.crud.taskRun();
        t.crud.taskRuns();
        t.crud.taskSpec();
        t.crud.taskSpecs();
        t.crud.txAttempt();
        t.crud.txAttempts();
        t.crud.tx();
        t.crud.txes();
        t.crud.configuration();
        t.crud.configurations();
    },
})


const schema = makeSchema({
    types: [
        Query,
        Configuration,
        BridgeType,
        ExternalInitiator,
        Head,
        Initiator,
        JobRun,
        JobSpec,
        RunRequest,
        RunResult,
        ServiceAgreement,
        TaskRun,
        TaskSpec,
        TxAttempt,
        Tx],
    plugins: [nexusPrismaPlugin({
        outputs: {
            typegen: __dirname + '/generated/nexus-prisma.ts',
        }
    })],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',//require.resolve('./generated/client'),
                alias: 'prisma',
            },
            {
                source: require.resolve('./context'),
                alias: 'Context',
            },
        ],
    },
})

const federatedSchema = transformSchemaFederation(schema, {
    Query: {
        extend: true,
    },
    JobSpec: {
        keyFields: ['id'],
        async resolveReference({ id }: any, { prisma }, info) {
            return await prisma.jobSpec.findOne({ where: { id } })
        }
    },
})

export default federatedSchema;