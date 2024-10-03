"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mendixmodelsdk_1 = require("mendixmodelsdk");
var mendixplatformsdk_1 = require("mendixplatformsdk");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var client, app, workingCopy, model, domainModelInterface, domainModel, questionCategoryEntity, questionEntity, inspectionEntity, inspectionAnswerEntity, answerTypeEntity, inspectionReasonEntity, inspectionStatusEntity, establishmentEntity, questionCategoryToQuestion, inspectionToInspectionAnswer, questionToInspectionAnswer, establishmentToInspection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new mendixplatformsdk_1.MendixPlatformClient();
                    return [4 /*yield*/, client.createNewApp("JorntFinCoos-".concat(Date.now()), {
                            repositoryType: "git",
                        })];
                case 1:
                    app = _a.sent();
                    return [4 /*yield*/, app.createTemporaryWorkingCopy("main")];
                case 2:
                    workingCopy = _a.sent();
                    return [4 /*yield*/, workingCopy.openModel()];
                case 3:
                    model = _a.sent();
                    domainModelInterface = model.allDomainModels().filter(function (dm) { return dm.containerAsModule.name === "MyFirstModule"; })[0];
                    return [4 /*yield*/, domainModelInterface.load()];
                case 4:
                    domainModel = _a.sent();
                    questionCategoryEntity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
                    questionCategoryEntity.name = "QuestionCategory";
                    questionCategoryEntity.location = { x: 100, y: 100 }; // X, Y coordinates
                    createAttribute(questionCategoryEntity, "Name", "String");
                    createAttribute(questionCategoryEntity, "ForFirstForm", "Boolean");
                    createAttribute(questionCategoryEntity, "IsActive", "Boolean");
                    questionEntity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
                    questionEntity.name = "Question";
                    questionEntity.location = { x: 300, y: 100 }; // X, Y coordinates
                    createAttribute(questionEntity, "QuestionCategoryId", "Integer");
                    createAttribute(questionEntity, "Code", "String");
                    createAttribute(questionEntity, "QuestionText", "String");
                    createAttribute(questionEntity, "HasNA", "Boolean");
                    createAttribute(questionEntity, "HasNO", "Boolean");
                    createAttribute(questionEntity, "Score", "Integer");
                    createAttribute(questionEntity, "IsActive", "Boolean");
                    inspectionEntity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
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
                    inspectionAnswerEntity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
                    inspectionAnswerEntity.name = "InspectionAnswer";
                    inspectionAnswerEntity.location = { x: 700, y: 100 }; // X, Y coordinates
                    createAttribute(inspectionAnswerEntity, "InspectionId", "Integer");
                    createAttribute(inspectionAnswerEntity, "QuestionId", "Integer");
                    createAttribute(inspectionAnswerEntity, "AnswerTypeId", "Integer");
                    createAttribute(inspectionAnswerEntity, "IsActive", "Boolean");
                    answerTypeEntity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
                    answerTypeEntity.name = "AnswerType";
                    answerTypeEntity.location = { x: 900, y: 100 }; // X, Y coordinates
                    createAttribute(answerTypeEntity, "Label", "String");
                    createAttribute(answerTypeEntity, "Order", "Integer");
                    createAttribute(answerTypeEntity, "IsActive", "Boolean");
                    createAttribute(answerTypeEntity, "Code", "String");
                    createAttribute(answerTypeEntity, "ColorClass", "String");
                    createAttribute(answerTypeEntity, "BackgroundColor", "String");
                    inspectionReasonEntity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
                    inspectionReasonEntity.name = "InspectionReason";
                    inspectionReasonEntity.location = { x: 1100, y: 100 }; // X, Y coordinates
                    createAttribute(inspectionReasonEntity, "Label", "String");
                    createAttribute(inspectionReasonEntity, "Order", "Integer");
                    createAttribute(inspectionReasonEntity, "Is_Active", "Boolean");
                    createAttribute(inspectionReasonEntity, "ShowAdditionalField", "Boolean");
                    inspectionStatusEntity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
                    inspectionStatusEntity.name = "InspectionStatus";
                    inspectionStatusEntity.location = { x: 1300, y: 100 }; // X, Y coordinates
                    createAttribute(inspectionStatusEntity, "Label", "String");
                    createAttribute(inspectionStatusEntity, "Order", "Integer");
                    createAttribute(inspectionStatusEntity, "Is_Active", "Boolean");
                    createAttribute(inspectionStatusEntity, "BackgroundClass", "String");
                    createAttribute(inspectionStatusEntity, "TextClass", "String");
                    establishmentEntity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
                    establishmentEntity.name = "Establishment";
                    establishmentEntity.location = { x: 1500, y: 100 }; // X, Y coordinates
                    createAttribute(establishmentEntity, "EstablishmentCode", "String");
                    createAttribute(establishmentEntity, "LocationId", "Integer");
                    createAttribute(establishmentEntity, "IsActive", "Boolean");
                    questionCategoryToQuestion = mendixmodelsdk_1.domainmodels.Association.createIn(domainModel);
                    questionCategoryToQuestion.parent = questionCategoryEntity;
                    questionCategoryToQuestion.child = questionEntity;
                    questionCategoryToQuestion.type = mendixmodelsdk_1.domainmodels.AssociationType.ReferenceSet;
                    questionCategoryToQuestion.name = "QuestionCategory_Questions";
                    inspectionToInspectionAnswer = mendixmodelsdk_1.domainmodels.Association.createIn(domainModel);
                    inspectionToInspectionAnswer.parent = inspectionEntity;
                    inspectionToInspectionAnswer.child = inspectionAnswerEntity;
                    inspectionToInspectionAnswer.type = mendixmodelsdk_1.domainmodels.AssociationType.ReferenceSet;
                    inspectionToInspectionAnswer.name = "Inspection_InspectionAnswers";
                    questionToInspectionAnswer = mendixmodelsdk_1.domainmodels.Association.createIn(domainModel);
                    questionToInspectionAnswer.parent = questionEntity;
                    questionToInspectionAnswer.child = inspectionAnswerEntity;
                    questionToInspectionAnswer.type = mendixmodelsdk_1.domainmodels.AssociationType.Reference;
                    questionToInspectionAnswer.name = "Question_InspectionAnswers";
                    establishmentToInspection = mendixmodelsdk_1.domainmodels.Association.createIn(domainModel);
                    establishmentToInspection.parent = establishmentEntity;
                    establishmentToInspection.child = inspectionEntity;
                    establishmentToInspection.type = mendixmodelsdk_1.domainmodels.AssociationType.ReferenceSet;
                    establishmentToInspection.name = "Establishment_Inspections";
                    return [4 /*yield*/, model.flushChanges()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, workingCopy.commitToRepository("main")];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createAttribute(entity, name, type) {
    var attribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(entity);
    attribute.name = name;
    switch (type) {
        case "AutoNumber":
            attribute.type = mendixmodelsdk_1.domainmodels.AutoNumberAttributeType.create(entity.model);
            break;
        case "String":
            attribute.type = mendixmodelsdk_1.domainmodels.StringAttributeType.create(entity.model);
            break;
        case "Integer":
            attribute.type = mendixmodelsdk_1.domainmodels.IntegerAttributeType.create(entity.model);
            break;
        case "Boolean":
            attribute.type = mendixmodelsdk_1.domainmodels.BooleanAttributeType.create(entity.model);
            break;
        case "DateTime":
            attribute.type = mendixmodelsdk_1.domainmodels.DateTimeAttributeType.create(entity.model);
            break;
        default:
            throw new Error("Unsupported attribute type: ".concat(type));
    }
}
main().catch(console.error);
