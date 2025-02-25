const GraphQLDate = require('graphql-iso-date');
const GraphQLJSON = require('graphql-type-json');
const { GraphQLUpload } = require('graphql-upload');

const {
  getAllProblems,
  getProblemsByEnvironmentId,
  addProblem,
  deleteProblem,
  deleteProblemsFromSource,
  addProblemsFromSource,
  getProblemSources,
  getProblemHarborScanMatches,
  addProblemHarborScanMatch,
  deleteProblemHarborScanMatch,
} = require('./resources/problem/resolvers');

const {
  getFactsByEnvironmentId,
  addFact,
  addFacts,
  deleteFact,
  deleteFactsFromSource,
  addFactReference,
  deleteFactReference,
  deleteAllFactReferencesByFactId,
  getFactReferencesByFactId,
  getProjectsByFactSearch,
  getEnvironmentsByFactSearch,
} = require('./resources/fact/resolvers');

const {
  SeverityScoreType
} = require('./resources/problem/types');

const {
  getLagoonVersion,
} = require('./resources/lagoon/resolvers');

const {
  getDeploymentsByEnvironmentId,
  getDeploymentByRemoteId,
  addDeployment,
  deleteDeployment,
  updateDeployment,
  cancelDeployment,
  deployEnvironmentLatest,
  deployEnvironmentBranch,
  deployEnvironmentPullrequest,
  deployEnvironmentPromote,
  switchActiveStandby,
  deploymentSubscriber,
  getDeploymentUrl,
  getBuildLog,
} = require('./resources/deployment/resolvers');

const {
  getTasksByEnvironmentId,
  getTaskByRemoteId,
  getTaskById,
  addTask,
  deleteTask,
  updateTask,
  taskDrushArchiveDump,
  taskDrushSqlDump,
  taskDrushCacheClear,
  taskDrushCron,
  taskDrushSqlSync,
  taskDrushRsyncFiles,
  taskDrushUserLogin,
  taskSubscriber,
  getTaskLog,
} = require('./resources/task/resolvers');

const {
  addAdvancedTaskDefinition,
  advancedTaskDefinitionById,
  resolveTasksForEnvironment,
  getRegisteredTasksByEnvironmentId,
  advancedTaskDefinitionArgumentById,
  invokeRegisteredTask,
  deleteAdvancedTaskDefinition,
} = require('./resources/task/task_definition_resolvers');

const {
  getFilesByTaskId,
  uploadFilesForTask,
  deleteFilesForTask,
  getDownloadLink,
} = require('./resources/file/resolvers');

const {
  addOrUpdateEnvironment,
  addOrUpdateEnvironmentStorage,
  getEnvironmentByName,
  getEnvironmentById,
  getEnvironmentByOpenshiftProjectName,
  getEnvironmentByKubernetesNamespaceName,
  getEnvironmentHoursMonthByEnvironmentId,
  getEnvironmentStorageByEnvironmentId,
  getEnvironmentStorageMonthByEnvironmentId,
  getEnvironmentHitsMonthByEnvironmentId,
  getEnvironmentByDeploymentId,
  getEnvironmentByTaskId,
  getEnvironmentByBackupId,
  getEnvironmentServicesByEnvironmentId,
  setEnvironmentServices,
  deleteEnvironment,
  getEnvironmentsByProjectId,
  updateEnvironment,
  getAllEnvironments,
  deleteAllEnvironments,
  userCanSshToEnvironment,
  getEnvironmentUrl,
} = require('./resources/environment/resolvers');

const {
  addNotificationMicrosoftTeams,
  addNotificationRocketChat,
  addNotificationSlack,
  addNotificationWebhook,
  addNotificationToProject,
  deleteNotificationMicrosoftTeams,
  deleteNotificationRocketChat,
  deleteNotificationSlack,
  deleteNotificationWebhook,
  getNotificationsByProjectId,
  removeNotificationFromProject,
  updateNotificationMicrosoftTeams,
  updateNotificationRocketChat,
  updateNotificationSlack,
  updateNotificationWebhook,
  addNotificationEmail,
  updateNotificationEmail,
  deleteNotificationEmail,
  deleteAllNotificationEmails,
  deleteAllNotificationSlacks,
  deleteAllNotificationMicrosoftTeams,
  deleteAllNotificationRocketChats,
  deleteAllNotificationWebhook,
  removeAllNotificationsFromAllProjects,
} = require('./resources/notification/resolvers');

const {
  addOpenshift,
  deleteOpenshift,
  getAllOpenshifts,
  getOpenshiftByProjectId,
  updateOpenshift,
  deleteAllOpenshifts,
} = require('./resources/openshift/resolvers');

const {
  deleteProject,
  addProject,
  getProjectByName,
  getProjectByGitUrl,
  getProjectByEnvironmentId,
  getProjectsByMetadata,
  getAllProjects,
  updateProject,
  deleteAllProjects,
  getProjectUrl,
  updateProjectMetadata,
  removeProjectMetadataByKey
} = require('./resources/project/resolvers');

const {
  getUserSshKeys,
  addSshKey,
  updateSshKey,
  deleteSshKey,
  deleteSshKeyById,
  deleteAllSshKeys,
  removeAllSshKeysFromAllUsers,
} = require('./resources/sshKey/resolvers');

const {
  getMe,
  getUserBySshKey,
  addUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} = require('./resources/user/resolvers');

const {
  getAllGroups,
  getGroupsByProjectId,
  getGroupsByUserId,
  getGroupByName,
  addGroup,
  addBillingGroup,
  updateBillingGroup,
  addProjectToBillingGroup,
  updateProjectBillingGroup,
  removeProjectFromBillingGroup,
  getAllProjectsInGroup,
  getBillingGroupCost,
  getAllBillingGroupsCost,
  getAllProjectsByGroupId,
  updateGroup,
  deleteGroup,
  deleteAllGroups,
  addUserToGroup,
  removeUserFromGroup,
  addGroupsToProject,
  removeGroupsFromProject,
} = require('./resources/group/resolvers');

const {
  addBillingModifier,
  updateBillingModifier,
  deleteBillingModifier,
  deleteAllBillingModifiersByBillingGroup,
  getBillingModifiers,
  getAllModifiersByGroupId
} = require('./resources/billing/resolvers');

const {
  addBackup,
  getBackupsByEnvironmentId,
  deleteBackup,
  deleteAllBackups,
  addRestore,
  getRestoreByBackupId,
  updateRestore,
  backupSubscriber,
  getRestoreLocation,
} = require('./resources/backup/resolvers');

const {
  getEnvVarsByProjectId,
  getEnvVarsByEnvironmentId,
  addEnvVariable,
  deleteEnvVariable,
} = require('./resources/env-variables/resolvers');

const resolvers = {
  Upload: GraphQLUpload,
  GroupRole: {
    GUEST: 'guest',
    REPORTER: 'reporter',
    DEVELOPER: 'developer',
    MAINTAINER: 'maintainer',
    OWNER: 'owner',
  },
  ProjectOrderType: {
    NAME: 'name',
    CREATED: 'created',
  },
  EnvOrderType: {
    NAME: 'name',
    UPDATED: 'updated',
  },
  DeployType: {
    BRANCH: 'branch',
    PULLREQUEST: 'pullrequest',
    PROMOTE: 'promote',
  },
  EnvType: {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
  },
  EnvVariableType: {
    PROJECT: 'project',
    ENVIRONMENT: 'environment',
  },
  EnvVariableScope: {
    BUILD: 'build',
    RUNTIME: 'runtime',
    GLOBAL: 'global',
    CONTAINER_REGISTRY: 'container_registry',
    INTERNAL_CONTAINER_REGISTRY: 'internal_container_registry',
  },
  RestoreStatusType: {
    PENDING: 'pending',
    SUCCESSFUL: 'successful',
    FAILED: 'failed',
  },
  DeploymentStatusType: {
    NEW: 'new',
    PENDING: 'pending',
    RUNNING: 'running',
    CANCELLED: 'cancelled',
    ERROR: 'error',
    FAILED: 'failed',
    COMPLETE: 'complete',
  },
  NotificationType: {
    SLACK: 'slack',
    ROCKETCHAT: 'rocketchat',
    MICROSOFTTEAMS: 'microsoftteams',
    EMAIL: 'email',
    WEBHOOK: 'webhook',
  },
  NotificationContentType: {
    DEPLOYMENT: 'deployment',
    PROBLEM: 'problem',
  },
  TaskStatusType: {
    ACTIVE: 'active',
    SUCCEEDED: 'succeeded',
    FAILED: 'failed',
  },
  Project: {
    notifications: getNotificationsByProjectId,
    openshift: getOpenshiftByProjectId,
    kubernetes: getOpenshiftByProjectId,
    environments: getEnvironmentsByProjectId,
    envVariables: getEnvVarsByProjectId,
    groups: getGroupsByProjectId,
  },
  GroupInterface: {
    __resolveType(group) {
      switch (group.type) {
        case 'billing':
          return 'BillingGroup';
        default:
          return 'Group';
      }
    },
  },
  Group: {
    projects: getAllProjectsByGroupId,
  },
  BillingGroup: {
    projects: getAllProjectsByGroupId,
    modifiers: getAllModifiersByGroupId,
  },
  Environment: {
    project: getProjectByEnvironmentId,
    deployments: getDeploymentsByEnvironmentId,
    tasks: getTasksByEnvironmentId,
    advancedTasks: getRegisteredTasksByEnvironmentId,
    hoursMonth: getEnvironmentHoursMonthByEnvironmentId,
    storages: getEnvironmentStorageByEnvironmentId,
    storageMonth: getEnvironmentStorageMonthByEnvironmentId,
    hitsMonth: getEnvironmentHitsMonthByEnvironmentId,
    backups: getBackupsByEnvironmentId,
    envVariables: getEnvVarsByEnvironmentId,
    services: getEnvironmentServicesByEnvironmentId,
    problems: getProblemsByEnvironmentId,
    facts: getFactsByEnvironmentId,
  },
  Fact: {
    references: getFactReferencesByFactId,
  },
  Deployment: {
    environment: getEnvironmentByDeploymentId,
    uiLink: getDeploymentUrl,
    buildLog: getBuildLog,
  },
  Task: {
    environment: getEnvironmentByTaskId,
    files: getFilesByTaskId,
    logs: getTaskLog
  },
  File: {
    download: getDownloadLink
  },
  Notification: {
    __resolveType(obj) {
      switch (obj.type) {
        case 'slack':
          return 'NotificationSlack';
        case 'rocketchat':
          return 'NotificationRocketChat';
        case 'microsoftteams':
          return 'NotificationMicrosoftTeams';
        case 'email':
          return 'NotificationEmail';
        case 'webhook':
          return 'NotificationWebhook';
        default:
          return null;
      }
    },
  },
  AdvancedTaskDefinition: {
    __resolveType (obj) {
      switch(obj.type) {
        case 'IMAGE':
          return 'AdvancedTaskDefinitionImage';
        case 'COMMAND':
          return 'AdvancedTaskDefinitionCommand';
        default:
          return null;
      }
    },
  },
  User: {
    sshKeys: getUserSshKeys,
    groups: getGroupsByUserId,
  },
  Backup: {
    restore: getRestoreByBackupId,
    environment: getEnvironmentByBackupId,
  },
  Restore: {
    restoreLocation: getRestoreLocation,
  },
  Query: {
    me: getMe,
    lagoonVersion: getLagoonVersion,
    userBySshKey: getUserBySshKey,
    projectByGitUrl: getProjectByGitUrl,
    projectByName: getProjectByName,
    groupByName: getGroupByName,
    problemSources: getProblemSources,
    environmentByName: getEnvironmentByName,
    environmentById: getEnvironmentById,
    environmentByOpenshiftProjectName: getEnvironmentByOpenshiftProjectName,
    environmentByKubernetesNamespaceName: getEnvironmentByKubernetesNamespaceName,
    environmentsByFactSearch: getEnvironmentsByFactSearch,
    userCanSshToEnvironment,
    deploymentByRemoteId: getDeploymentByRemoteId,
    taskByRemoteId: getTaskByRemoteId,
    taskById: getTaskById,
    advancedTaskDefinitionById,
    advancedTasksForEnvironment: resolveTasksForEnvironment,
    advancedTaskDefinitionArgumentById,
    allProjects: getAllProjects,
    allOpenshifts: getAllOpenshifts,
    allKubernetes: getAllOpenshifts,
    allEnvironments: getAllEnvironments,
    allProblems: getAllProblems,
    allGroups: getAllGroups,
    allProjectsInGroup: getAllProjectsInGroup,
    billingGroupCost: getBillingGroupCost,
    allBillingGroupsCost: getAllBillingGroupsCost,
    allBillingModifiers: getBillingModifiers,
    allProblemHarborScanMatchers: getProblemHarborScanMatches,
    projectsByMetadata: getProjectsByMetadata,
    projectsByFactSearch: getProjectsByFactSearch,
  },
  Mutation: {
    addProblem,
    addProblemHarborScanMatch,
    deleteProblem,
    deleteProblemsFromSource,
    deleteProblemHarborScanMatch,
    addFact,
    addFacts,
    deleteFact,
    deleteFactsFromSource,
    addFactReference,
    deleteFactReference,
    deleteAllFactReferencesByFactId,
    addOrUpdateEnvironment,
    updateEnvironment,
    deleteEnvironment,
    deleteAllEnvironments,
    addOrUpdateEnvironmentStorage,
    addNotificationSlack,
    updateNotificationSlack,
    deleteNotificationSlack,
    addNotificationWebhook,
    updateNotificationWebhook,
    deleteNotificationWebhook,
    deleteAllNotificationSlacks,
    deleteAllNotificationWebhook,
    addNotificationRocketChat,
    updateNotificationRocketChat,
    deleteNotificationRocketChat,
    deleteAllNotificationRocketChats,
    addNotificationMicrosoftTeams,
    updateNotificationMicrosoftTeams,
    deleteNotificationMicrosoftTeams,
    deleteAllNotificationMicrosoftTeams,
    addNotificationEmail,
    updateNotificationEmail,
    deleteNotificationEmail,
    deleteAllNotificationEmails,
    addNotificationToProject,
    removeNotificationFromProject,
    removeAllNotificationsFromAllProjects,
    addOpenshift,
    updateOpenshift,
    deleteOpenshift,
    deleteAllOpenshifts,
    addKubernetes: addOpenshift,
    updateKubernetes: updateOpenshift,
    deleteKubernetes: deleteOpenshift,
    deleteAllKubernetes: deleteAllOpenshifts,
    addProject,
    updateProject,
    deleteProject,
    deleteAllProjects,
    updateProjectMetadata,
    removeProjectMetadataByKey,
    addSshKey,
    updateSshKey,
    deleteSshKey,
    deleteSshKeyById,
    deleteAllSshKeys,
    removeAllSshKeysFromAllUsers,
    addUser,
    updateUser,
    deleteUser,
    deleteAllUsers,
    addDeployment,
    deleteDeployment,
    updateDeployment,
    cancelDeployment,
    addBackup,
    deleteBackup,
    deleteAllBackups,
    addRestore,
    updateRestore,
    addEnvVariable,
    deleteEnvVariable,
    addTask,
    addAdvancedTaskDefinition,
    deleteAdvancedTaskDefinition,
    invokeRegisteredTask,
    taskDrushArchiveDump,
    taskDrushSqlDump,
    taskDrushCacheClear,
    taskDrushCron,
    taskDrushSqlSync,
    taskDrushRsyncFiles,
    taskDrushUserLogin,
    deleteTask,
    updateTask,
    setEnvironmentServices,
    uploadFilesForTask,
    deleteFilesForTask,
    deployEnvironmentLatest,
    deployEnvironmentBranch,
    deployEnvironmentPullrequest,
    deployEnvironmentPromote,
    switchActiveStandby,
    addGroup,
    addBillingGroup,
    updateBillingGroup,
    deleteBillingGroup: deleteGroup,
    addProjectToBillingGroup,
    updateProjectBillingGroup,
    removeProjectFromBillingGroup,
    updateGroup,
    deleteGroup,
    deleteAllGroups,
    addUserToGroup,
    removeUserFromGroup,
    addGroupsToProject,
    removeGroupsFromProject,
    addBillingModifier,
    updateBillingModifier,
    deleteBillingModifier,
    deleteAllBillingModifiersByBillingGroup,
  },
  Subscription: {
    backupChanged: backupSubscriber,
    deploymentChanged: deploymentSubscriber,
    taskChanged: taskSubscriber,
  },
  Date: GraphQLDate,
  JSON: GraphQLJSON,
  SeverityScore: SeverityScoreType,
};

module.exports = resolvers;
