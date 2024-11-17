import { DataTypes } from 'sequelize'
import database from './database'

let sequelize = database.getConnection()

const Usuario = sequelize.define(
  'usuario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'usuarios',
    timestamps: true
  }
)

const Perfil = sequelize.define(
  'perfil',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombres: {
      type: DataTypes.STRING,
      allowNull: false
    },

    apellidos: {
      type: DataTypes.STRING,
      allowNull: false
    },

    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },

    tipo_cedula: {
      type: DataTypes.STRING,
      allowNull: false
    },

    cedula: {
      type: DataTypes.STRING,
      allowNull: false
    },

    correo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },

    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id'
      }
    },

    enteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ente,
        key: 'id'
      }
    }
  },
  {
    tableName: 'perfiles',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['tipo_cedula', 'cedula']
      }
    ]
  }
)

const PerfilMedico = sequelize.define(
  'perfil_medico',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    perfilId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Perfil,
        key: 'id'
      }
    },

    patologias: {
      type: DataTypes.STRING,
      allowNull: true
    },

    medicamentos: {
      type: DataTypes.STRING,
      allowNull: true
    },

    alergias: {
      type: DataTypes.STRING,
      allowNull: true
    },

    cirugias: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'perfiles_medicos',
    timestamps: true
  }
)

const Cita = sequelize.define(
  'cita',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha_solicitud: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_cita: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PerfilId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Perfil,
        key: 'id'
      }
    },
    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Perfil,
        key: 'id'
      }
    },
    departamentoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Departamento,
        key: 'id'
      }
    }
  },
  {
    tableName: 'citas',
    timestamps: true
  }
)

const Ente = sequelize.define(
  'ente',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'entes',
    timestamps: true
  }
)

const Almacen = sequelize.define(
  'almacen',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cubiculo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'almacenes',
    timestamps: true
  }
)

const Articulo = sequelize.define(
  'articulo',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'articulos',
    timestamps: true
  }
)

const Departamento = sequelize.define(
  'departamento',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cubiculo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'departamentos',
    timestamps: true
  }
)

const Historia = sequelize.define(
  'historia',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PerfilId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Perfil,
        key: 'id'
      }
    },
    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Perfil,
        key: 'id'
      }
    },
    departamentoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Departamento,
        key: 'id'
      }
    },
    fecha_atencion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sintomas: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    diagnostico: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tratamiento: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    peso_paciente: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    tension_paciente: {
      type: DataTypes.STRING,
      allowNull: false
    },
    medida_cintura: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    medida_cadera: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  },
  {
    tableName: 'historias',
    timestamps: true
  }
)

const Ingreso = sequelize.define(
  'ingreso',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    articuloId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Articulo,
        key: 'id'
      }
    },
    almacenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Almacen,
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'ingresos',
    timestamps: true
  }
)

const Rol = sequelize.define(
  'rol',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'roles',
    timestamps: true
  }
)

const Permiso = sequelize.define(
  'permiso',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'permisos',
    timestamps: true
  }
)

const Servicio = sequelize.define(
  'servicio',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'servicios',
    timestamps: true
  }
)

const PerfilOnBeneficiario = sequelize.define(
  'perfil_on_beneficiario',
  {
    PerfilId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Perfil,
        key: 'id'
      }
    },
    beneficiarioId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Perfil,
        key: 'id'
      }
    }
  },
  {
    tableName: 'perfiles_on_beneficiarios',
    timestamps: true
  }
)

const RolOnPerfil = sequelize.define(
  'rol_on_perfil',
  {
    rolId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Rol,
        key: 'id'
      }
    },
    PerfilId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Perfil,
        key: 'id'
      }
    }
  },
  {
    tableName: 'roles_on_Perfiles',
    timestamps: true
  }
)

const RolOnPermiso = sequelize.define(
  'rol_on_permiso',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    permisoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Permiso,
        key: 'id'
      }
    },
    rolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Rol,
        key: 'id'
      }
    }
  },
  {
    tableName: 'roles_on_permisos',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['permisoId', 'rolId']
      }
    ]
  }
)

const DepartamentoOnPerfil = sequelize.define(
  'departamento_on_perfil',
  {
    departamentoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Departamento,
        key: 'id'
      }
    },
    PerfilId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Perfil,
        key: 'id'
      }
    }
  },
  {
    tableName: 'departamentos_on_Perfiles',
    timestamps: true
  }
)

const PerfilOnServicio = sequelize.define(
  'perfil_on_servicio',
  {
    PerfilId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Perfil,
        key: 'id'
      }
    },
    servicioId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Servicio,
        key: 'id'
      }
    },
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_recepcion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resultados: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  },
  {
    tableName: 'Perfiles_on_servicios',
    timestamps: true
  }
)

const ArticuloOnAlmacen = sequelize.define(
  'articulo_on_almacen',
  {
    almacenId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Almacen,
        key: 'id'
      }
    },
    articuloId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Articulo,
        key: 'id'
      }
    }
  },
  {
    tableName: 'articulos_on_almacenes',
    timestamps: true
  }
)

Ente.hasMany(Perfil, { foreignKey: 'enteId' })
Usuario.hasOne(Perfil, { foreignKey: 'usuarioId' })
Perfil.belongsTo(Usuario, { foreignKey: 'usuarioId' })
Perfil.belongsTo(Ente, { foreignKey: 'enteId' })
PerfilMedico.belongsTo(Perfil, { foreignKey: 'perfilId' })

Perfil.hasMany(Cita, { foreignKey: 'PerfilId', as: 'citasSolicitadas' })
Cita.belongsTo(Perfil, { foreignKey: 'PerfilId', as: 'solicitante' })

Perfil.hasMany(Cita, { foreignKey: 'pacienteId', as: 'citasPaciente' })
Cita.belongsTo(Perfil, { foreignKey: 'pacienteId', as: 'paciente' })

Departamento.hasMany(Cita, { foreignKey: 'departamentoId' })
Cita.belongsTo(Departamento, { foreignKey: 'departamentoId' })

Perfil.belongsToMany(Perfil, {
  through: PerfilOnBeneficiario,
  as: 'beneficiarios',
  foreignKey: 'PerfilId',
  otherKey: 'beneficiarioId'
})

Perfil.belongsToMany(Rol, { through: RolOnPerfil, foreignKey: 'PerfilId' })
Rol.belongsToMany(Perfil, { through: RolOnPerfil, foreignKey: 'rolId' })

Rol.belongsToMany(Permiso, { through: RolOnPermiso, foreignKey: 'rolId' })
Permiso.belongsToMany(Rol, { through: RolOnPermiso, foreignKey: 'permisoId' })

Perfil.belongsToMany(Departamento, { through: DepartamentoOnPerfil, foreignKey: 'PerfilId' })
Departamento.belongsToMany(Perfil, { through: DepartamentoOnPerfil, foreignKey: 'departamentoId' })

Perfil.belongsToMany(Servicio, { through: PerfilOnServicio, foreignKey: 'PerfilId' })
Servicio.belongsToMany(Perfil, { through: PerfilOnServicio, foreignKey: 'servicioId' })

Articulo.belongsToMany(Almacen, { through: ArticuloOnAlmacen, foreignKey: 'articuloId' })
Almacen.belongsToMany(Articulo, { through: ArticuloOnAlmacen, foreignKey: 'almacenId' })

export {
  Almacen,
  Articulo,
  ArticuloOnAlmacen,
  Cita,
  Departamento,
  DepartamentoOnPerfil,
  Ente,
  Historia,
  Ingreso,
  Perfil,
  PerfilMedico,
  PerfilOnBeneficiario,
  PerfilOnServicio,
  Permiso,
  Rol,
  RolOnPerfil,
  RolOnPermiso,
  Servicio,
  Usuario
}
