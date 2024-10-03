import { domainmodels } from "mendixmodelsdk";
import { MendixPlatformClient } from "mendixplatformsdk";

async function main() {
    const client = new MendixPlatformClient();

    const app = await client.createNewApp(`JorntFinCoos-${Date.now()}`, {
        repositoryType: "git",
    });

    const workingCopy = await app.createTemporaryWorkingCopy("main");
    const model = await workingCopy.openModel();

    const domainModelInterface = model.allDomainModels().filter(dm => dm.containerAsModule.name === "MyFirstModule")[0];
    const domainModel = await domainModelInterface.load();

    // Create Entity: QuestionCategory
    const questionCategoryEntity = domainmodels.Entity.createIn(domainModel);
    questionCategoryEntity.name = "QuestionCategory";
    questionCategoryEntity.location = { x: 100, y: 100 }; // X, Y coordinates
    createAttribute(questionCategoryEntity, "Name", "String");
    createAttribute(questionCategoryEntity, "ForFirstForm", "Boolean");
    createAttribute(questionCategoryEntity, "IsActive", "Boolean");

    // Create Entity: Question
    const questionEntity = domainmodels.Entity.createIn(domainModel);
    questionEntity.name = "Question";
    questionEntity.location = { x: 300, y: 100 }; // X, Y coordinates
    createAttribute(questionEntity, "QuestionCategoryId", "Integer");
    createAttribute(questionEntity, "Code", "String");
    createAttribute(questionEntity, "QuestionText", "String");
    createAttribute(questionEntity, "HasNA", "Boolean");
    createAttribute(questionEntity, "HasNO", "Boolean");
    createAttribute(questionEntity, "Score", "Integer");
    createAttribute(questionEntity, "IsActive", "Boolean");

    // Create Entity: Inspection
    const inspectionEntity = domainmodels.Entity.createIn(domainModel);
    inspectionEntity.name = "Inspection";
    inspectionEntity.location = { x: 500, y: 100 }; // X, Y coordinates
    createAttribute(inspectionEntity, "EstablishmentId", "Integer");
    createAttribute(inspectionEntity, "InspectionNumber", "String");
    createAttribute(inspectionEntity, "ReasonId", "Integer");
    createAttribute(inspectionEntity, "InspectionDate", "DateTime");
    createAttribute(inspectionEntity, "InspectorId", "Integer");
    createAttribute(inspectionEntity, "TimeIn", "DateTime");
    createAttribute(inspectionEntity, "TimeOut", "DateTime");
    createAttribute(inspectionEntity, "InspectionStatusId", "Integer");
    createAttribute(inspectionEntity, "FollowupNotes", "String");
    createAttribute(inspectionEntity, "FinalScorePoints", "Integer");
    createAttribute(inspectionEntity, "IsActive", "Boolean");

    // Create Entity: InspectionAnswer
    const inspectionAnswerEntity = domainmodels.Entity.createIn(domainModel);
    inspectionAnswerEntity.name = "InspectionAnswer";
    inspectionAnswerEntity.location = { x: 700, y: 100 }; // X, Y coordinates
    createAttribute(inspectionAnswerEntity, "InspectionId", "Integer");
    createAttribute(inspectionAnswerEntity, "QuestionId", "Integer");
    createAttribute(inspectionAnswerEntity, "AnswerTypeId", "Integer");
    createAttribute(inspectionAnswerEntity, "IsActive", "Boolean");

    // Create Entity: AnswerType
    const answerTypeEntity = domainmodels.Entity.createIn(domainModel);
    answerTypeEntity.name = "AnswerType";
    answerTypeEntity.location = { x: 900, y: 100 }; // X, Y coordinates
    createAttribute(answerTypeEntity, "Label", "String");
    createAttribute(answerTypeEntity, "Order", "Integer");
    createAttribute(answerTypeEntity, "IsActive", "Boolean");
    createAttribute(answerTypeEntity, "Code", "String");
    createAttribute(answerTypeEntity, "ColorClass", "String");
    createAttribute(answerTypeEntity, "BackgroundColor", "String");

    // Create Entity: InspectionReason
    const inspectionReasonEntity = domainmodels.Entity.createIn(domainModel);
    inspectionReasonEntity.name = "InspectionReason";
    inspectionReasonEntity.location = { x: 1100, y: 100 }; // X, Y coordinates
    createAttribute(inspectionReasonEntity, "Label", "String");
    createAttribute(inspectionReasonEntity, "Order", "Integer");
    createAttribute(inspectionReasonEntity, "Is_Active", "Boolean");
    createAttribute(inspectionReasonEntity, "ShowAdditionalField", "Boolean");

    // Create Entity: InspectionStatus
    const inspectionStatusEntity = domainmodels.Entity.createIn(domainModel);
    inspectionStatusEntity.name = "InspectionStatus";
    inspectionStatusEntity.location = { x: 1300, y: 100 }; // X, Y coordinates
    createAttribute(inspectionStatusEntity, "Label", "String");
    createAttribute(inspectionStatusEntity, "Order", "Integer");
    createAttribute(inspectionStatusEntity, "Is_Active", "Boolean");
    createAttribute(inspectionStatusEntity, "BackgroundClass", "String");
    createAttribute(inspectionStatusEntity, "TextClass", "String");

    // Create Entity: Establishment
    const establishmentEntity = domainmodels.Entity.createIn(domainModel);
    establishmentEntity.name = "Establishment";
    establishmentEntity.location = { x: 1500, y: 100 }; // X, Y coordinates
    createAttribute(establishmentEntity, "EstablishmentCode", "String");
    createAttribute(establishmentEntity, "LocationId", "Integer");
    createAttribute(establishmentEntity, "IsActive", "Boolean");

    // Add Associations

    // QuestionCategory -> Question (1:N)
    const questionCategoryToQuestion = domainmodels.Association.createIn(domainModel);
    questionCategoryToQuestion.parent = questionCategoryEntity;
    questionCategoryToQuestion.child = questionEntity;
    questionCategoryToQuestion.type = domainmodels.AssociationType.ReferenceSet;
    questionCategoryToQuestion.name = "QuestionCategory_Questions";

    // Inspection -> InspectionAnswer (1:N)
    const inspectionToInspectionAnswer = domainmodels.Association.createIn(domainModel);
    inspectionToInspectionAnswer.parent = inspectionEntity;
    inspectionToInspectionAnswer.child = inspectionAnswerEntity;
    inspectionToInspectionAnswer.type = domainmodels.AssociationType.ReferenceSet;
    inspectionToInspectionAnswer.name = "Inspection_InspectionAnswers";

    // Question -> InspectionAnswer (1:N)
    const questionToInspectionAnswer = domainmodels.Association.createIn(domainModel);
    questionToInspectionAnswer.parent = questionEntity;
    questionToInspectionAnswer.child = inspectionAnswerEntity;
    questionToInspectionAnswer.type = domainmodels.AssociationType.Reference;
    questionToInspectionAnswer.name = "Question_InspectionAnswers";

    // Establishment -> Inspection (1:N)
    const establishmentToInspection = domainmodels.Association.createIn(domainModel);
    establishmentToInspection.parent = establishmentEntity;
    establishmentToInspection.child = inspectionEntity;
    establishmentToInspection.type = domainmodels.AssociationType.ReferenceSet;
    establishmentToInspection.name = "Establishment_Inspections";


    await model.flushChanges();

    await workingCopy.commitToRepository("main");
}

function createAttribute(entity: domainmodels.Entity, name: string, type: string) {
    const attribute = domainmodels.Attribute.createIn(entity);
    attribute.name = name;

    switch (type) {
        case "AutoNumber":
            attribute.type = domainmodels.AutoNumberAttributeType.create(entity.model);
            break;
        case "String":
            attribute.type = domainmodels.StringAttributeType.create(entity.model);
            break;
        case "Integer":
            attribute.type = domainmodels.IntegerAttributeType.create(entity.model);
            break;
        case "Boolean":
            attribute.type = domainmodels.BooleanAttributeType.create(entity.model);
            break;
        case "DateTime":
            attribute.type = domainmodels.DateTimeAttributeType.create(entity.model);
            break;
        default:
            throw new Error(`Unsupported attribute type: ${type}`);
    }
}

main().catch(console.error);