import { nexusPrismaPlugin } from 'nexus-prisma'
import { idArg, makeSchema, objectType, stringArg, subscriptionField, intArg } from 'nexus'
import { transformSchemaFederation } from 'graphql-transform-federation';

const excludedFields = new Set([
    "incoming_token_hash",
    "salt",
    "outgoing_token",
    "hashed_secret",
    "outgoing_secret",
    "access_key"
])

const bridgeTypes = objectType({
    name: 'bridge_types',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const externalInitiators = objectType({
    name: 'external_initiators',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const heads = objectType({
    name: 'heads',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const initiators = objectType({
    name: 'initiators',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const jobRuns = objectType({
    name: 'job_runs',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const jobSpecs = objectType({
    name: 'job_specs',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const runRequests = objectType({
    name: 'run_requests',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const runResults = objectType({
    name: 'run_results',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const serviceAgreements = objectType({
    name: 'service_agreements',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const taskRuns = objectType({
    name: 'task_runs',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const taskSpecs = objectType({
    name: 'task_specs',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const txAttempts = objectType({
    name: 'tx_attempts',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const txes = objectType({
    name: 'txes',
    definition(t) {
        Object.entries(t.model).map(([name, field]: any) => {
            if (!excludedFields.has(name)) field()
        })
    }
})

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.bridgeTypes();
        t.crud.externalInitiators();
        t.crud.heads();
        t.crud.initiators();
        t.crud.jobRuns();
        t.crud.jobSpecs();
        t.crud.runRequests();
        t.crud.runResults();
        t.crud.serviceAgreements();
        t.crud.taskRuns();
        t.crud.taskSpecs();
        t.crud.txAttempts();
        t.crud.txes();
    },
})

/*
const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        //console.debug(t.crud)
    },
})
*/

const schema = makeSchema({
    types: [
        Query,
        bridgeTypes,
        externalInitiators,
        heads,
        initiators,
        jobRuns,
        jobSpecs,
        runRequests,
        runResults,
        serviceAgreements,
        taskRuns,
        taskSpecs,
        txAttempts,
        txes],
    plugins: [nexusPrismaPlugin()],
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
    }
})

export default federatedSchema;