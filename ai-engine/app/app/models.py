from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime
import uuid

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
