from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Integer, JSON
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime
import uuid

class Merchant(Base):
    __tablename__ = "Merchant"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    contribution_margin_rate = Column(Float, nullable=False, default=0.35)

class Guardrail(Base):
    __tablename__ = "Guardrail"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    merchantId = Column(String, nullable=False)
    ruleType = Column(String, nullable=False)
    valueJson = Column(JSON, nullable=False)

class Customer(Base):
    __tablename__ = "Customer"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    merchantId = Column(String, nullable=False)
    segment = Column(String, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)

    assignments = relationship("ExperimentAssignment", back_populates="customer")
    orders = relationship("Order", back_populates="customer")

class Experiment(Base):
    __tablename__ = "Experiment"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    hypothesisId = Column(String, nullable=False)
    status = Column(String, default="draft")
    
    assignments = relationship("ExperimentAssignment", back_populates="experiment")
    result = relationship("ExperimentResult", back_populates="experiment", uselist=False)
    memories = relationship("ExperimentMemory", back_populates="experiment")

class ExperimentAssignment(Base):
    __tablename__ = "ExperimentAssignment"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    experimentId = Column(String, ForeignKey("Experiment.id"), nullable=False)
    customerId = Column(String, ForeignKey("Customer.id"), nullable=False)
    arm = Column(String, nullable=False) # control, treatment

    experiment = relationship("Experiment", back_populates="assignments")
    customer = relationship("Customer", back_populates="assignments")

class Order(Base):
    __tablename__ = "Order"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customerId = Column(String, ForeignKey("Customer.id"), nullable=False)
    merchantId = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)

    customer = relationship("Customer", back_populates="orders")
    payments = relationship("Payment", back_populates="order")

class Payment(Base):
    __tablename__ = "Payment"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    orderId = Column(String, ForeignKey("Order.id"), nullable=False)
    method = Column(String, nullable=False)
    status = Column(String, nullable=False)
    failureReason = Column(String, nullable=True)

    order = relationship("Order", back_populates="payments")

class ExperimentResult(Base):
    __tablename__ = "ExperimentResult"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    experimentId = Column(String, ForeignKey("Experiment.id"), nullable=False, unique=True)
    lift = Column(Float, nullable=False)
    pValue = Column(Float, nullable=False)
    confidenceInterval = Column(String, nullable=False)
    incrementalRevenue = Column(Float, nullable=False)
    incrementalProfit = Column(Float, nullable=False)
    explanationText = Column(String, nullable=False)

    experiment = relationship("Experiment", back_populates="result")

class ExperimentMemory(Base):
    __tablename__ = "ExperimentMemory"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    experimentId = Column(String, ForeignKey("Experiment.id"), nullable=False)
    segment = Column(String, nullable=False)
    lever = Column(String, nullable=False)
    outcomeLabel = Column(String, nullable=False)
    incrementalProfit = Column(Float, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    
    experiment = relationship("Experiment", back_populates="memories")

class AgentRun(Base):
    __tablename__ = "AgentRun"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    merchantId = Column(String, nullable=False)
    startedAt = Column(DateTime, default=datetime.utcnow)
    endedAt = Column(DateTime, nullable=True)
    finalState = Column(String, nullable=True)

    actions = relationship("AgentAction", back_populates="agentRun")

from sqlalchemy import JSON

class AgentAction(Base):
    __tablename__ = "AgentAction"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    agentRunId = Column(String, ForeignKey("AgentRun.id"), nullable=False)
    state = Column(String, nullable=False)
    inputJson = Column(JSON, nullable=True)
    outputJson = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    agentRun = relationship("AgentRun", back_populates="actions")
