-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombres" CHAR(100) NOT NULL,
    "apellidos" CHAR(100) NOT NULL,
    "username" CHAR(100) NOT NULL,
    "password" CHAR(100) NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "tipo_cedula" CHAR(100) NOT NULL,
    "cedula" BIGINT NOT NULL,
    "correo" CHAR(100) NOT NULL,
    "telefono" CHAR(100),
    "ente_id" INTEGER NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios_detalles" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "patologias" TEXT,
    "alergias" TEXT,
    "cirugias" TEXT,

    CONSTRAINT "usuarios_detalles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "citas" (
    "id" SERIAL NOT NULL,
    "fecha_solictud" TIMESTAMP(3) NOT NULL,
    "fecha_cita" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "paciente_id" INTEGER NOT NULL,
    "departamento_id" INTEGER NOT NULL,

    CONSTRAINT "citas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entes" (
    "id" SERIAL NOT NULL,
    "nombre" CHAR(100) NOT NULL,

    CONSTRAINT "entes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "almacenes" (
    "id" SERIAL NOT NULL,
    "cubiculo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "almacenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articulos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departamentos" (
    "id" SERIAL NOT NULL,
    "nombre" CHAR(100) NOT NULL,
    "cubiculo" CHAR(100) NOT NULL,

    CONSTRAINT "departamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historias" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "paciente_id" INTEGER NOT NULL,
    "departamento_id" INTEGER NOT NULL,
    "fecha_atencion" DATE NOT NULL,
    "sintomas" CHAR(1000) NOT NULL,
    "diagnostico" CHAR(100) NOT NULL,
    "tratamiento" CHAR(100),
    "peso_paciente" DECIMAL,
    "tension_paciente" TEXT NOT NULL,
    "medida_cintura" DECIMAL,
    "medida_cadera" DECIMAL,

    CONSTRAINT "historias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingresos" (
    "id" SERIAL NOT NULL,
    "articulo_id" INTEGER NOT NULL,
    "almacen_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha_ingreso" DATE NOT NULL,

    CONSTRAINT "ingresos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "nombre" CHAR(100) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permisos" (
    "id" SERIAL NOT NULL,
    "nombre" CHAR(100) NOT NULL,

    CONSTRAINT "permisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicios" (
    "id" SERIAL NOT NULL,
    "nombre" CHAR(100) NOT NULL,

    CONSTRAINT "servicios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios_articulos" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "articulo_id" INTEGER NOT NULL,
    "almacen_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha_retiro" DATE NOT NULL,

    CONSTRAINT "usuarios_articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colas_pacientes" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "departamento_id" INTEGER NOT NULL,

    CONSTRAINT "colas_pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios_on_beneficiarios" (
    "usuario_id" INTEGER NOT NULL,
    "beneficiario_id" INTEGER NOT NULL,

    CONSTRAINT "usuarios_on_beneficiarios_pkey" PRIMARY KEY ("usuario_id","beneficiario_id")
);

-- CreateTable
CREATE TABLE "roles_on_usuarios" (
    "rol_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "roles_on_usuarios_pkey" PRIMARY KEY ("rol_id","usuario_id")
);

-- CreateTable
CREATE TABLE "roles_on_permisos" (
    "id" SERIAL NOT NULL,
    "permiso_id" INTEGER NOT NULL,
    "rol_id" INTEGER NOT NULL,

    CONSTRAINT "roles_on_permisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departamentos_on_usuarios" (
    "departamento_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "departamentos_on_usuarios_pkey" PRIMARY KEY ("departamento_id","usuario_id")
);

-- CreateTable
CREATE TABLE "usuarios_on_servicios" (
    "usuario_id" INTEGER NOT NULL,
    "servicio_id" INTEGER NOT NULL,
    "fecha_emision" DATE NOT NULL,
    "feha_recepcion" DATE,
    "resultados" CHAR(1000),

    CONSTRAINT "usuarios_on_servicios_pkey" PRIMARY KEY ("usuario_id","servicio_id")
);

-- CreateTable
CREATE TABLE "articulos_on_almacenes" (
    "almacen_id" INTEGER NOT NULL,
    "articulo_id" INTEGER NOT NULL,

    CONSTRAINT "articulos_on_almacenes_pkey" PRIMARY KEY ("almacen_id","articulo_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_tipo_cedula_cedula_key" ON "usuarios"("tipo_cedula", "cedula");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_detalles_usuario_id_key" ON "usuarios_detalles"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_on_permisos_permiso_id_rol_id_key" ON "roles_on_permisos"("permiso_id", "rol_id");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_ente_id_fkey" FOREIGN KEY ("ente_id") REFERENCES "entes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_detalles" ADD CONSTRAINT "usuarios_detalles_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historias" ADD CONSTRAINT "historias_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historias" ADD CONSTRAINT "historias_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historias" ADD CONSTRAINT "historias_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingresos" ADD CONSTRAINT "ingresos_articulo_id_fkey" FOREIGN KEY ("articulo_id") REFERENCES "articulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingresos" ADD CONSTRAINT "ingresos_almacen_id_fkey" FOREIGN KEY ("almacen_id") REFERENCES "almacenes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_articulos" ADD CONSTRAINT "usuarios_articulos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_articulos" ADD CONSTRAINT "usuarios_articulos_articulo_id_fkey" FOREIGN KEY ("articulo_id") REFERENCES "articulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_articulos" ADD CONSTRAINT "usuarios_articulos_almacen_id_fkey" FOREIGN KEY ("almacen_id") REFERENCES "almacenes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colas_pacientes" ADD CONSTRAINT "colas_pacientes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colas_pacientes" ADD CONSTRAINT "colas_pacientes_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_on_beneficiarios" ADD CONSTRAINT "usuarios_on_beneficiarios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_on_beneficiarios" ADD CONSTRAINT "usuarios_on_beneficiarios_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_on_usuarios" ADD CONSTRAINT "roles_on_usuarios_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_on_usuarios" ADD CONSTRAINT "roles_on_usuarios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_on_permisos" ADD CONSTRAINT "roles_on_permisos_permiso_id_fkey" FOREIGN KEY ("permiso_id") REFERENCES "permisos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_on_permisos" ADD CONSTRAINT "roles_on_permisos_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departamentos_on_usuarios" ADD CONSTRAINT "departamentos_on_usuarios_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departamentos_on_usuarios" ADD CONSTRAINT "departamentos_on_usuarios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_on_servicios" ADD CONSTRAINT "usuarios_on_servicios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_on_servicios" ADD CONSTRAINT "usuarios_on_servicios_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "servicios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos_on_almacenes" ADD CONSTRAINT "articulos_on_almacenes_almacen_id_fkey" FOREIGN KEY ("almacen_id") REFERENCES "almacenes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos_on_almacenes" ADD CONSTRAINT "articulos_on_almacenes_articulo_id_fkey" FOREIGN KEY ("articulo_id") REFERENCES "articulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
